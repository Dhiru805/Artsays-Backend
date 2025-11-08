const mongoose = require("mongoose");
const liveSchema = require("../../../../Models/SocialMedia/liveSchema");
const {
  upload,
  getFilePath,
} = require("../../../../Middlewares/Multerfile/liveImageUploadMiddlware");
const fs = require("fs");
const path = require("path");

// Socket.IO instance (will be injected)
let io = null;

const setSocketIO = (socketIO) => {
  io = socketIO;
};

const updateLive = [
  upload,
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const {
        userId,
        title,
        description,
        category,
        tags,
        privacy,
        comments,
        streamDuration,
        viewersWaiting,
        viewCount,
        likeCount,
      } = req.body;

      const errors = [];
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        errors.push("Valid streamKey is required.");
      }
      if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("Valid user ID is required.");
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      // Find the existing live document
      const existingLive = await liveSchema.findById(id).session(session);
      if (!existingLive) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          hasError: true,
          message: "Live stream not found.",
        });
      }

      if (userId && existingLive.userId.toString() !== userId.toString()) {
        await session.abortTransaction();
        session.endSession();
        return res.status(403).json({
          hasError: true,
          message: "Unauthorized to update this live stream.",
        });
      }

      // updates
      const updates = {
        title: title !== undefined ? title.trim() : existingLive.title,
        description:
          description !== undefined
            ? description.trim()
            : existingLive.description,
        category:
          category !== undefined ? category.trim() : existingLive.category,
        "live.privacy": privacy || existingLive.live.privacy,
        tags: tags !== undefined ? JSON.parse(tags) : existingLive.tags,
        comments:
          comments !== undefined ? JSON.parse(comments) : existingLive.comments,
      };

      // Handle live object updates (isLive, streamDuration, etc.)
      if (req.body.live) {
        const liveUpdates = req.body.live;
        if (liveUpdates.isLive !== undefined) {
          updates["live.isLive"] = liveUpdates.isLive;
        }
        if (liveUpdates.streamDuration !== undefined) {
          // Store duration as time format string (MM:SS)
          if (typeof liveUpdates.streamDuration === "string") {
            updates["live.streamDuration"] = liveUpdates.streamDuration;
          } else if (typeof liveUpdates.streamDuration === "number") {
            // Convert seconds to MM:SS format if it's a number
            const minutes = Math.floor(liveUpdates.streamDuration / 60);
            const seconds = liveUpdates.streamDuration % 60;
            updates["live.streamDuration"] = `${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          } else {
            updates["live.streamDuration"] = liveUpdates.streamDuration;
          }
        }
        if (liveUpdates.viewCount !== undefined) {
          updates["live.viewCount"] = liveUpdates.viewCount;
        }
        if (liveUpdates.likeCount !== undefined) {
          updates["live.likeCount"] = liveUpdates.likeCount;
        }
      }

      // Handle thumbnail update (multer .fields → req.files.thumbnail[0])
      const uploadedThumb =
        req.file ||
        (req.files &&
          Array.isArray(req.files.thumbnail) &&
          req.files.thumbnail[0]);
      if (uploadedThumb) {
        try {
          // Delete old thumbnail if it exists
          if (existingLive.thumbnail) {
            const normalizedThumbnailPath = existingLive.thumbnail.replace(
              /\//g,
              path.sep
            );
            const oldThumbnailPath = path.resolve(
              __dirname,
              "../../../../",
              normalizedThumbnailPath
            );
            console.log(
              "Attempting to delete old thumbnail:",
              oldThumbnailPath
            );
            if (fs.existsSync(oldThumbnailPath)) {
              fs.unlinkSync(oldThumbnailPath);
              console.log(
                "Old thumbnail deleted successfully:",
                oldThumbnailPath
              );
            } else {
              console.log("Old thumbnail file not found:", oldThumbnailPath);
            }
          }

          // Get the new thumbnail path from uploaded file
          const newThumbnailPath = getFilePath(uploadedThumb);
          updates.thumbnail = newThumbnailPath;
          console.log("New thumbnail uploaded:", newThumbnailPath);
        } catch (error) {
          console.error("Error handling thumbnail update:", error);
          // Continue with other updates even if thumbnail handling fails
        }
      }

      // Update the document
      const updatedLive = await liveSchema.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      // Broadcast live stream update to all connected clients
      if (io && updatedLive.live.streamUrl) {
        console.log("Broadcasting live stream update:", {
          streamUrl: updatedLive.live.streamUrl,
          updatedFields: Object.keys(updates),
          thumbnail: updatedLive.thumbnail,
        });

        io.to(updatedLive.live.streamUrl).emit("liveStreamUpdated", {
          streamUrl: updatedLive.live.streamUrl,
          live: updatedLive,
          updatedFields: Object.keys(updates),
        });
      }

      res.status(200).json({
        success: true,
        message: "Live stream updated successfully",
        live: updatedLive,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating live session:", error);
      res.status(500).json({
        hasError: true,
        message: "An error occurred while updating the live session.",
      });
      console.error("Error details:", error.message, error.stack);
    }
  },
];

module.exports = { updateLive, setSocketIO };
