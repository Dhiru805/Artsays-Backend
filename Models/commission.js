const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleHeading: { type: String, required: true, trim: true },
  articleContent: { type: String, required: true },
  bannerImage: { type: String },
  buttonName: { type: String, default: null }, // optional
  buttonPath: { type: String, default: null }, // optional
});

const commissionSchema = new mongoose.Schema(
  {
    webpageHeading: { type: String, required: true, trim: true },
    webpageDescription: { type: String, required: true },
    articles: [articleSchema],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commission", commissionSchema);
