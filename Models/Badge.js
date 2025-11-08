const mongoose = require("mongoose");

const verificationBadgeSchema = new mongoose.Schema(
  {
    badgeName: {
      type: String,
      required: true,
      trim: true,
    },
    badgeDescription: {
      type: String,
      required: true,
      trim: true,
    },
    badgePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    badgeImage: {
      type: String, // store image filename or path from multer
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationBadge", verificationBadgeSchema);
