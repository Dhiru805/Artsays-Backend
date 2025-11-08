
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleHeading: { type: String, required: true, trim: true },
  articleContent: { type: String, required: true },
  bannerImage: { type: String },
});

const cardSchema = new mongoose.Schema({
  cardTitle: { type: String, required: true },
  cardImage: { type: String, required: true },
});

const affiliateSchema = new mongoose.Schema(
  {
    webpageHeading: { type: String, required: true, trim: true },
    webpageDescription: { type: String, required: true },
    articles: [articleSchema],  
    cards: [cardSchema],       
    cardsHeading: { type: String, trim: true },
    cardsDescription: { type: String, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affiliate", affiliateSchema);
