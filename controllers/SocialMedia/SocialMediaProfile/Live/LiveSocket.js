const Live = require("../../../../Models/SocialMedia/liveSchema");

const socketIdToUser = {}; 
const userLikes = {};

const streamers = new Map(); // Map of roomName to streamer socket info 

const initLiveSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // User joins live (legacy for viewer counts/likes, using streamUrl)
    socket.on("joinLive", async ({ streamUrl, userId }) => {
      try {
        // Validate input
        if (!streamUrl || !userId) {
          console.error("Missing streamUrl or userId in joinLive");
          return;
        }

        socketIdToUser[socket.id] = { streamUrl, userId };

        // Join socket.io room for this live first
        socket.join(streamUrl);

        // Update DB - add user to viewersWaiting and increment viewCount
        const live = await Live.findOneAndUpdate(
          { streamUrl },
          { 
            $addToSet: { "live.viewersWaiting": userId },
            $inc: { "live.viewCount": 1 }
          },
          { new: true }
        );

        if (!live) {
          console.error("Live stream not found:", streamUrl);
          socket.leave(streamUrl);
          delete socketIdToUser[socket.id];
          return;
        }

        // Check if this is the streamer joining
        if (live.userId && live.userId.toString() === userId) {
          // For legacy joinLive, also register streamer with roomName derived from streamKey
          const roomName = `live-room-${live.live.streamKey}`;
          streamers.set(roomName, {
            socketId: socket.id,
            userId: userId,
            roomName: roomName,
            streamUrl: streamUrl
          });
          console.log("Streamer registered for room:", roomName);
        }

        // Broadcast updated count
        io.to(streamUrl).emit("viewersCountUpdated", {
          streamUrl,
          currentViewers: live.live.viewersWaiting.length,
          totalViews: live.live.viewCount,
        });
      } catch (err) {
        console.error("Error in joinLive:", err.message);
        if (socketIdToUser[socket.id]) {
          socket.leave(streamUrl);
          delete socketIdToUser[socket.id];
        }
      }
    });

    // User leaves live (legacy for viewer counts/likes, using streamUrl)
    socket.on("leaveLive", async ({ streamUrl, userId }) => {
      try {
        // Validate input
        if (!streamUrl || !userId) {
          console.error("Missing streamUrl or userId in leaveLive");
          return;
        }

        // Leave socket.io room first
        socket.leave(streamUrl);

        // Update DB - remove user from viewersWaiting and decrement viewCount
        const live = await Live.findOneAndUpdate(
          { streamUrl },
          { 
            $pull: { "live.viewersWaiting": userId },
            $inc: { "live.viewCount": -1 }
          },
          { new: true }
        );

        if (!live) {
          console.error("Live stream not found:", streamUrl);
          delete socketIdToUser[socket.id];
          return;
        }

        // Broadcast updated count
        io.to(streamUrl).emit("viewersCountUpdated", {
          streamUrl,
          currentViewers: live.live.viewersWaiting.length,
          totalViews: live.live.viewCount,
        });

        // remove mapping
        delete socketIdToUser[socket.id];
      } catch (err) {
        console.error("Error in leaveLive:", err.message);
        if (socketIdToUser[socket.id]) {
          socket.leave(streamUrl);
          delete socketIdToUser[socket.id];
        }
      }
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      const mapping = socketIdToUser[socket.id];
      if (mapping) {
        const { streamUrl, userId } = mapping;

        // Remove streamer registration if this was the streamer (check both streamUrl and roomName)
        const streamerByUrl = streamers.get(streamUrl);
        if (streamerByUrl && streamerByUrl.userId === userId) {
          streamers.delete(streamUrl);
          console.log("Streamer disconnected for streamUrl:", streamUrl);
          io.to(streamUrl).emit("streamEnded", { message: "Stream has ended" });
        }

        // Also check roomName derived from streamKey if available
        const live = await Live.findOne({ streamUrl });
        if (live) {
          const roomName = `live-room-${live.live.streamKey}`;
          const streamerByRoom = streamers.get(roomName);
          if (streamerByRoom && streamerByRoom.userId === userId) {
            streamers.delete(roomName);
            console.log("Streamer disconnected for roomName:", roomName);
            io.to(roomName).emit("streamEnded", { message: "Stream has ended" });
          }
        }

        try {
          const liveUpdate = await Live.findOneAndUpdate(
            { streamUrl },
            { 
              $pull: { "live.viewersWaiting": userId },
              $inc: { "live.viewCount": -1 }
            },
            { new: true }
          );

          if (liveUpdate) {
            io.to(streamUrl).emit("viewersCountUpdated", {
              streamUrl,
              count: liveUpdate.live.viewersWaiting.length,
            });
          }
        } catch (err) {
          console.error("Error on disconnect:", err.message);
        }

        delete socketIdToUser[socket.id];
      }

      console.log("Client disconnected:", socket.id);
    });

    // Handle like/unlike live stream
    socket.on("toggleLike", async ({ streamUrl, userId }) => {
      try {
        // Validate input
        if (!streamUrl || !userId) {
          console.error("Missing streamUrl or userId in toggleLike");
          return;
        }

        // Initialize user likes if not exists
        if (!userLikes[userId]) {
          userLikes[userId] = new Set();
        }

        const hasLiked = userLikes[userId].has(streamUrl);
        let live;

        if (hasLiked) {
          // Unlike: remove from set and decrement likeCount
          userLikes[userId].delete(streamUrl);
          live = await Live.findOneAndUpdate(
            { streamUrl },
            { $inc: { "live.likeCount": -1 } },
            { new: true }
          );
        } else {
          // Like: add to set and increment likeCount
          userLikes[userId].add(streamUrl);
          live = await Live.findOneAndUpdate(
            { streamUrl },
            { $inc: { "live.likeCount": 1 } },
            { new: true }
          );
        }

        if (!live) {
          console.error("Live stream not found:", streamUrl);
          return;
        }

        // Broadcast updated like count to all viewers
        io.to(streamUrl).emit("likeCountUpdated", {
          streamUrl,
          likeCount: live.live.likeCount,
          isLiked: !hasLiked, // New like status
          userId
        });

        // Send confirmation to the user who liked/unliked
        socket.emit("likeToggleSuccess", {
          streamUrl,
          likeCount: live.live.likeCount,
          isLiked: !hasLiked
        });

      } catch (err) {
        console.error("Error in toggleLike:", err.message);
        socket.emit("likeToggleError", { 
          message: "Failed to toggle like",
          error: err.message 
        });
      }
    });

    // Get current like status for a user
    socket.on("getLikeStatus", async ({ streamUrl, userId }) => {
      try {
        if (!streamUrl || !userId) {
          console.error("Missing streamUrl or userId in getLikeStatus");
          return;
        }

        const hasLiked = userLikes[userId] && userLikes[userId].has(streamUrl);
        
        socket.emit("likeStatus", {
          streamUrl,
          isLiked: hasLiked
        });

      } catch (err) {
        console.error("Error in getLikeStatus:", err.message);
        socket.emit("likeStatusError", { 
          message: "Failed to get like status",
          error: err.message 
        });
      }
    });

    // WebRTC Signaling Events

    // Streamer starts broadcasting (legacy, but update to use roomName)
    socket.on("startBroadcasting", async ({ streamUrl, userId }) => {
      console.log("Streamer starting broadcast:", { streamUrl, userId });

      // Register streamer with roomName
      const live = await Live.findOne({ streamUrl });
      if (live) {
        const roomName = `live-room-${live.live.streamKey}`;
        streamers.set(roomName, {
          socketId: socket.id,
          userId: userId,
          roomName: roomName,
          streamUrl: streamUrl
        });
        console.log("Streamer registered for broadcasting in room:", roomName);
      } else {
        // Fallback to streamUrl if no live found
        streamers.set(streamUrl, {
          socketId: socket.id,
          userId: userId,
          streamUrl: streamUrl
        });
      }
    });

    // Streamer stops broadcasting (update to use roomName)
    socket.on("stopBroadcasting", async ({ streamUrl, userId }) => {
      console.log("Streamer stopping broadcast:", { streamUrl, userId });

      // Remove streamer registration (check both)
      streamers.delete(streamUrl);
      const live = await Live.findOne({ streamUrl });
      if (live) {
        const roomName = `live-room-${live.live.streamKey}`;
        streamers.delete(roomName);
        io.to(roomName).emit("streamEnded", { message: "Stream has ended" });
      }

      // Notify all viewers that stream ended
      io.to(streamUrl).emit("streamEnded", { message: "Stream has ended" });

      console.log("Streamer unregistered for broadcasting:", streamUrl);
    });

    // Viewer joins live stream for WebRTC (updated to use roomName)
    socket.on("joinLiveStream", ({ roomName, userId }) => {
      console.log("Viewer joining live stream room:", { roomName, userId });
      // Join the room for signaling
      socket.join(roomName);
      // Use streamer tracking from index.js
      // No streamer logic here; handled by main socket server
    });

    // Streamer sends offer to viewer (updated for roomName and viewerSocketId)
    socket.on("streamerOffer", ({ roomName, offer, viewerSocketId }) => {
      console.log("Streamer offer for viewer:", viewerSocketId, "in room:", roomName);
      
      if (viewerSocketId) {
        io.to(viewerSocketId).emit("streamerOffer", { 
          roomName,
          offer 
        });
      } else {
        console.error("No viewerSocketId provided in streamerOffer");
      }
    });

    // Viewer sends answer to streamer (updated for roomName)
    socket.on("viewerAnswer", ({ roomName, answer }) => {
      console.log("Viewer answer for room:", roomName);
      
      const streamer = streamers.get(roomName);
      if (streamer) {
        io.to(streamer.socketId).emit("viewerAnswer", { 
          roomName,
          answer 
        });
      }
    });

    // ICE candidate exchange (updated for roomName and viewerSocketId)
    socket.on("streamerIceCandidate", ({ roomName, candidate, viewerSocketId }) => {
      console.log("Streamer ICE candidate for viewer:", viewerSocketId, "in room:", roomName);
      
      if (viewerSocketId) {
        io.to(viewerSocketId).emit("streamerIceCandidate", { 
          roomName,
          candidate 
        });
      } else {
        console.error("No viewerSocketId provided in streamerIceCandidate");
      }
    });

    socket.on("viewerIceCandidate", ({ roomName, candidate }) => {
      console.log("Viewer ICE candidate for room:", roomName);
      
      const streamer = streamers.get(roomName);
      if (streamer) {
        io.to(streamer.socketId).emit("viewerIceCandidate", { 
          roomName,
          candidate 
        });
      }
    });

    // Handle startLive event from streamer
    socket.on("startLive", async ({ roomName, userId }) => {
      console.log("Streamer starting live in room:", roomName);
      
      // Register streamer in map if not already
      if (!streamers.has(roomName)) {
        const live = await Live.findOne({ "live.streamKey": roomName.split('-')[2] });
        if (live && live.userId.toString() === userId) {
          streamers.set(roomName, {
            socketId: socket.id,
            userId: userId,
            roomName: roomName,
            streamUrl: live.live.streamUrl
          });
          console.log(`Registered streamer for ${roomName}:`, { socketId: socket.id, userId });
        }
      }
      
      socket.join(roomName);
    });

    // Handle leaveLiveStream event
    socket.on("leaveLiveStream", ({ roomName }) => {
      console.log("Client leaving live stream room:", roomName);
      socket.leave(roomName);
    });

    // Handle streamEnded event
    socket.on("streamEnded", ({ roomName }) => {
      console.log("Stream ended for room:", roomName);
      io.to(roomName).emit("streamEnded");
      // Clean up streamer if applicable
      streamers.delete(roomName);
    });
  });
};

module.exports = initLiveSockets;
