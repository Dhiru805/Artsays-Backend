// models/Report.js
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who reported
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who is being reported

    // Optional targets
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commentId: { type: mongoose.Schema.Types.ObjectId }, // if comment report

    // New: classify what is being reported
    reportType: {
      type: String,
      enum: ["profile", "post", "comment"],
      required: true,
    },

    reason: { type: String, required: true },
    description: { type: String },

    status: {
      type: String,
      enum: ["pending", "reviewed", "action-taken"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
