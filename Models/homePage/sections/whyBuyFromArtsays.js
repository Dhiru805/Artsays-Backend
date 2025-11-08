// const mongoose = require("mongoose");

// const WhyBuyCardSchema = new mongoose.Schema({
//   heading: { type: String, required: true },
//   description: { type: String, required: true },
//   icon: { type: String },  // optional
// });

// const WhyBuyArtsaysSchema = new mongoose.Schema({
//   //homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String },
//   cards: { type: [WhyBuyCardSchema], default: [] },
//   buttonName: { type: String, required: true },
//   buttonLink: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("WhyBuyArtsays", WhyBuyArtsaysSchema);



const mongoose = require("mongoose");

const WhyBuyCardSchema = new mongoose.Schema({
  heading: { type: String, required: true, default: "Card Heading" },
  description: { type: String, required: true, default: "Card description goes here." },
  icon: { type: String, default: "./public/2.png" },
});

const WhyBuyArtsaysSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Why Buy from Artsays" },
    description: { type: String, default: "Here are the reasons why customers choose us." },
    cards: {
      type: [WhyBuyCardSchema],
      default: [
        { heading: "Quality", description: "High-quality products guaranteed.", icon: "./public/2.png" },
        { heading: "Trust", description: "Reliable service you can count on.", icon: "./public/2.png" },
        { heading: "Support", description: "Dedicated customer support team.", icon: "./public/2.png" },
      ],
    },
    buttonName: { type: String, required: true, default: "Explore Now" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
  },
  { timestamps: true }
);

WhyBuyArtsaysSchema.statics.ensureDefault = async function (homepageId) {
 let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Why Buy from Artsays",
      description: "Here are the reasons why customers choose us.",
      cards: [
        { heading: "Quality", description: "High-quality products guaranteed.", icon: "./public/2.png" },
        { heading: "Trust", description: "Reliable service you can count on.", icon: "./public/2.png" },
        { heading: "Support", description: "Dedicated customer support team.", icon: "./public/2.png" },
      ],
      buttonName: "Explore Now",
      buttonLink: `${process.env.Frontend_URL}`,
    });
    console.log("Default WhyBuyArtsays document created");
  } else {
    console.log("WhyBuyArtsays document already exists");
  }
};

module.exports = mongoose.model("WhyBuyArtsays", WhyBuyArtsaysSchema);
