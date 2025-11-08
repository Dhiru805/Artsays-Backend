const mongoose = require("mongoose");


const cardSchema = new mongoose.Schema({
  cardHeading: { type: String, trim: true }, // optional
  cardDescription: { type: String, trim: true }, // optional
});


const contactUsSchema = new mongoose.Schema(
  {
    webpageHeading: { type: String, required: true, trim: true },
    webpageDescription: { type: String, required: true, trim: true },
    bannerImage: { type: String, required: true }, 
    cards: [cardSchema], // optional
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
