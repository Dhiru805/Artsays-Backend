const mongoose = require("mongoose");
const { upload, getFilePath } = require("../../../../Middlewares/Multerfile/liveImageUploadMiddlware");
const liveSchema = require("../../../../Models/SocialMedia/liveSchema");

// Helper function to process tags and ensure they're in the correct format
const processTags = (tags) => {
  if (!tags) return [];
  
  if (Array.isArray(tags)) {
    const processedTags = [];
    
    tags.forEach(tag => {
      if (typeof tag === 'string') {
        if (tag.startsWith('[') && tag.endsWith(']')) {
          try {
            const parsedArray = JSON.parse(tag);
            if (Array.isArray(parsedArray)) {
              processedTags.push(...parsedArray);
            } else {
              processedTags.push(tag);
            }
          } catch (e) {
            console.error("Error parsing tag array:", e);
            processedTags.push(tag);
          }
        } else {
          // Regular string tag
          processedTags.push(tag);
        }
      } else {
        // Non-string tag, convert to string
        processedTags.push(String(tag));
      }
    });
    
    return processedTags;
  }
  
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // If parsing fails, treat as single tag
      return [tags];
    }
  }
  
  return [];
};

const createLive = [
  upload,
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let {
        userId,
        title,
        description,
        category,
        thumbnail,
        paidPromotion,
        privacy,
        tags,
        language,
        license,
        allowEmbedding,
        comments,
        customization,
        streamKey, 
      } = req.body;
      const errors = [];

      console.log(req.body);


      if (!streamKey || typeof streamKey !== "string" || !streamKey.trim()) {
        errors.push("A valid stream key is required.");
      }

      // The actual video stream will be handled via WebRTC peer-to-peer connection
      let streamUrl = `${process.env.Frontend_URL}/social-media/live/${streamKey}`;

      console.log("Creating live session with streamKey:", streamKey);
      console.log("Generated streamUrl:", streamUrl);
 
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("A valid user ID is required.");
      }
      if (!title || typeof title !== "string" || !title.trim()) {
        errors.push("Title is required.");
      }
      if (!description || typeof description !== "string" || !description.trim()) {
        errors.push("Description is required.");
      }
      if (!category || typeof category !== "string" || !category.trim()) {
        errors.push("Category is required.");
      }
      if (!tags || (Array.isArray(tags) && tags.length === 0) || (typeof tags === "string" && !tags.trim())) {
        errors.push("At least one tag is required.");
      }
      if (!language || typeof language !== "string" || !language.trim()) {
        errors.push("Language is required.");
      }
      if (!comments || typeof comments !== "string") {
        try {
          comments = JSON.parse(comments);
        } catch (err) {
          errors.push("Invalid comments format.");
        }
      }

      if (!req.files || !req.files.thumbnail || req.files.thumbnail.length === 0) {
        errors.push("Thumbnail image is required.");
      }

      privacy = privacy || "Public";
      if (!privacy || (privacy !== "Public" && privacy !== "Private")) {
        errors.push("Privacy must be either 'Public' or 'Private'.");
      }

      console.log(errors);

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      const existingLiveWithKey = await liveSchema.findOne(
        { userId, "live.streamKey": { $exists: true, $ne: null, $ne: "" } },
        null,
        { session }
      );
      if (existingLiveWithKey) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: "Cannot create one more streamKey, already streamKey present.",
        });
      }

      const newLive = new liveSchema({
        userId,
        title: title.trim(),
        description: description ? description.trim() : "",
        category: category ? category.trim() : "",
        thumbnail: req.files && req.files.thumbnail && req.files.thumbnail[0] ? getFilePath(req.files.thumbnail[0]) : "",
        paidPromotion: paidPromotion || false,
        tags: processTags(tags),
        language: language ? language.trim() : "",
        license: license ? license.trim() : "Standard YouTube License",
        allowEmbedding: allowEmbedding || false,
        comments: comments || {
          comments: true,
          sortBy: "Top",
        },
        customization: customization || {
          comments: { liveChat: false, liveChatReplay: false, liveChatSummary: false },
          participantModes: { anyone: false, subscribers: false, liveCommentary: false },
          reactions: { liveReactions: false },
        },
        live: {
          isLive: false,
          streamDuration: "00:00",
          viewCount: 0,
          likeCount: 0,
          privacy: privacy,
          chatMessages: [],
          streamKey,
          streamUrl,
        },
        createdAt: new Date(),
      });

      newLive.$session(session);
      await newLive.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        message: "Live details stored successfully",
        live: newLive,
        streamKey,
        streamUrl,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating live session:", error);
      res.status(500).json({
        hasError: true,
        message: "An error occurred while creating the live session.",
      });
      console.error("Error details:", error.message, error.stack);
    }
  },
];

module.exports = createLive;