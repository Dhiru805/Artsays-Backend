const mongoose = require("mongoose");

const partnerPageSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, required: true },
    mainDescription: { type: String },
    buttonName: { type: String },
    buttonLink: { type: String },

    cards: [
      {
        title: String,
        image: String,
        sectionHeading: String,
        sectionDescription: String,
        sectionImage: String,
      },
    ],

    section1Heading: String,
    section1Description: String,
    section1Images: [String], 

    section2Heading: String,
    section2Description: String,
    section2Cards: [
      {
        title: String,
        description: String,
        image: String,
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PartnerPage", partnerPageSchema);
