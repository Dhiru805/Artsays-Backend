const mongoose = require("mongoose");
const LicensingSEOSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    metaAuthor: {
      type: String,
      default: "Artsays",
      trim: true,
    },
    metaImage: {
      type: String, 
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LicensingSEO", LicensingSEOSchema);
