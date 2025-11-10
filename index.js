require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const User = require("./Models/usermode");
const Conversation = require("./Models/Conversations.js");
const Messages = require("./Models/Messages.js");
// import https from "https";
// import fs from "fs";
const initHomepage = require("./Models/homePage/initHomepage");
const initAboutUs = require("./Models/aboutUs/initAboutUs");
const initBiddingPasses = require("./controllers/BiddingPass/init");
require("./utils/expirePromotionsCron");

// import https from "https";
// import fs from "fs";

const app = express();
const http = require("http");
const { Server } = require("socket.io");

// Middleware
// app.use(express.json());
app.use(express.json({ limit: "100mb" })); // Increase payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());
// Serve uploaded assets publicly
app.use("/uploads", express.static(path.resolve("uploads")));

// app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use("/Images", express.static(path.resolve("Images")));
// app.use("/Documents", express.static(path.resolve("Documents")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    try {
      // Manage indexes if necessary
      const indexes = await User.collection.indexes();
      console.log("Indexes before deletion:", indexes);

      await initHomepage();
      await initAboutUs();
      await initBiddingPasses();

      if (indexes.some((index) => index.name === "phone_1")) {
        await User.collection.dropIndex("phone_1");
        console.log("'phone_1' index dropped");
      }
      if (indexes.some((index) => index.name === "email_1")) {
        await User.collection.dropIndex("email_1");
        console.log("'email_1' index dropped");
      }
    } catch (err) {
      console.error("Error during index operations:", err);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Conversation Routes
app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, reciverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, reciverId],
    });
    await newConversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    console.log("Error in creating conversation:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/conversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const reciverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await User.findById(reciverId);
        return {
          user: { email: user.email, name: user.name },
          conversationId: conversation._id,
        };
      })
    );

    res.status(200).json(conversationUserData);
  } catch (error) {
    console.log("Error retrieving conversation:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Message Routes
app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message } = req.body;
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log("Error in sending message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Messages.find({ conversationId });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error retrieving messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

require("./Routes")(app);

// Start server
// require('./routes')(app);

// Socket.IO server

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// --- Streamer tracking logic ---
const activeStreamers = {}; // { roomName: streamerSocketId }

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("startLive", (data) => {
    const { roomName } = data;
    console.log("Streamer starting live in room:", roomName);
    socket.join(roomName);
    activeStreamers[roomName] = socket.id; // Track streamer for this room
    console.log(
      `Streamer registered for room: ${roomName} (socket: ${socket.id})`
    );
  });

  socket.on("joinLiveStream", (data) => {
    const { roomName, userId } = data;
    console.log("Viewer joining room:", roomName, userId);

    socket.join(roomName);
    socket.emit("joinedLiveStream", { success: true, roomName });

    // Check for streamer
    const streamerSocketId = activeStreamers[roomName];
    if (streamerSocketId) {
      // Notify streamer that viewer joined
      io.to(streamerSocketId).emit("viewerJoined", {
        roomName,
        viewerSocketId: socket.id,
      });
      console.log(
        `Notified streamer (${streamerSocketId}) that viewer joined room: ${roomName}`
      );
    } else {
      console.log(`No streamer found for room: ${roomName}`);
      socket.emit("noStreamer", { roomName });
    }
  });

  socket.on("streamerOffer", (data) => {
    const { roomName, offer, viewerSocketId } = data;
    console.log("Streamer offer to viewer:", viewerSocketId);
    io.to(viewerSocketId).emit("streamerOffer", { offer });
  });

  socket.on("viewerAnswer", (data) => {
    const { roomName, answer } = data;
    console.log("Viewer answer received");
    socket.to(roomName).emit("viewerAnswer", { answer });
  });

  socket.on("viewerIceCandidate", (data) => {
    const { roomName, candidate } = data;
    socket.to(roomName).emit("viewerIceCandidate", { candidate });
  });

  socket.on("streamerIceCandidate", (data) => {
    const { roomName, candidate, viewerSocketId } = data;
    io.to(viewerSocketId).emit("streamerIceCandidate", { candidate });
  });

  // Handle stream end
  socket.on("streamEnded", (data) => {
    const { roomName } = data;
    io.to(roomName).emit("streamEnded");
    // Remove streamer from activeStreamers
    if (activeStreamers[roomName] === socket.id) {
      delete activeStreamers[roomName];
      console.log(`Streamer ended and removed from room: ${roomName}`);
    }
  });

  // Handle leave room
  socket.on("leaveLiveStream", (data) => {
    const { roomName } = data;
    console.log("Viewer leaving room:", roomName);
    socket.leave(roomName);
  });

  socket.on("disconnect", () => {
    // Remove streamer from activeStreamers if they disconnect
    for (const room in activeStreamers) {
      if (activeStreamers[room] === socket.id) {
        delete activeStreamers[room];
        console.log(`Streamer disconnected and removed from room: ${room}`);
      }
    }
    console.log("Client disconnected:", socket.id);
  });
});

//Chat Messages
// socket.on("joinRoom", (streamKey) => {
//   socket.join(streamKey);
//   console.log(`User joined room: ${streamKey}`);
// });

// socket.on("sendMessage", async ({ streamKey, userId, message }) => {
//   const newComment = { userId, message, createdAt: new Date() };

//   const live = await liveSchema.findOne({ "live.streamKey": streamKey });
//   if(live) {
//     live.live.chatMessages.push(newComment);
//     await live.save();
//   }
// })

// Initialize live sockets and inject Socket.IO into UpdateLive
try {
  const {
    initLiveSockets,
    // setUpdateLiveSocketIO,
  } = require("./controllers/SocialMedia/SocialMediaProfile");
  initLiveSockets(io);
  // setUpdateLiveSocketIO(io);
} catch (e) {
  console.error("Failed to init live sockets:", e.message);
}

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
