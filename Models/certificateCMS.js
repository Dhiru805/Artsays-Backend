const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String }, 
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    webpageHeading: {
      type: String,
      required: true,
      trim: true,
    },
    webpageDescription: {
      type: String,
      trim: true,
    },
    buttonName: {
      type: String,
      trim: true,
    },
    buttonLink: {
      type: String,
      trim: true,
    },
    section1Heading: {
      type: String,
      trim: true,
    },
    section1Description: {
      type: String,
      trim: true,
    },
    section1: {
      cards: [cardSchema],
    },
    section2Heading: {
      type: String,
      trim: true,
    },
    section2Description: {
      type: String,
      trim: true,
    },
    section2: {
      cards: [cardSchema],
    },
    certificateSection: {
      heading: { type: String, trim: true },
      description: { type: String, trim: true },
      image: { type: String },
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("CertificateCMS", certificateSchema);

