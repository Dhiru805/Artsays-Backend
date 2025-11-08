const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: { type: String, trim: true },
    location: { type: String, trim: true },

    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    images: [{ type: String, required: true }],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    hashtags: [{ type: String, lowercase: true, trim: true }],

    // ✅ Promotion-related fields
    promotionDetails: {
      category: { type: mongoose.Schema.Types.ObjectId, ref: "MainCategory" },
      goal: String,
      dailyBudget: Number,
      durationDays: Number,
      totalBudget: Number,
      gstAmount: Number,
      estimatedReach: String,
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ["pending", "active", "completed"],
        default: "pending",
      },
      paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "paid",
      },
    },

    isPromoted: { type: Boolean, default: false },
    targetAudience: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
