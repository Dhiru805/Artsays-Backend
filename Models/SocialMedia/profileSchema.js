const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    postProductsEnabled: { type: Boolean, default: false },


    // ✅ Recent Searches (max 10)
    recentSearches: {
      type: [
        {
          type: { type: String, enum: ["user", "hashtag"], required: true },
          refId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if user
          tag: String, // if hashtag
          label: String, // what to display
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    // ✅ Suggested users shown under search bar (max 5)
    searchBarSuggestedUsers: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          addedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    // ✅ Comment settings
    commentSettings: {
      allowCommentsFrom: {
        type: String,
        enum: ["everyone", "followers", "following", "mutual"],
        default: "everyone",
      },
      allowGifComments: {
        type: Boolean,
        default: true,
      },
    },
    // ✅ Blocked users
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
      // ✅ Collaboration settings
    collaborationSettings: {
      allowFrom: { type: String, enum: ["everyone", "following", "none"], default: "everyone" },
      manualApprove: { type: Boolean, default: false },
    },

    // ✅ Mention settings
    mentionSettings: {
      allowFrom: { type: String, enum: ["everyone", "following", "none"], default: "everyone" },
    },

  },
  { timestamps: true }
);
const Profile = mongoose.model("Profile", profileSchema); 
module.exports = Profile;