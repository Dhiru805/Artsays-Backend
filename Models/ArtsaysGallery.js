const mongoose = require("mongoose");

const artsaysGallerySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Artist", "Seller"],
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    curator: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ArtsaysGallery", artsaysGallerySchema);
