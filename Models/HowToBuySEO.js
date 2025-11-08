const mongoose = require("mongoose");
const HowToBuySEOSchema = new mongoose.Schema(
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

module.exports = mongoose.model("HowToBuySEO", HowToBuySEOSchema);
