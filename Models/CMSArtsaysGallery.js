const mongoose = require("mongoose");

const CMSArtsaysGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sectionTitle: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    sectionDescription: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("CMSArtsaysGallery", CMSArtsaysGallerySchema);
