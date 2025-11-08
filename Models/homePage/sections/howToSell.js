// const mongoose = require("mongoose");

// const HowToSellCardSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   icons: { type: [String], default: [] },
// });

// const HowToSellHPSchema = new mongoose.Schema({
//   //homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String },
//   buttonName: { type: String, required: true },
//   buttonLink: { type: String, required: true },
//   cards: { type: [HowToSellCardSchema], default: [] },
// }, { timestamps: true });

// module.exports = mongoose.model("HowToSellHP", HowToSellHPSchema);

const mongoose = require("mongoose");

const HowToSellCardSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "Step Title" },
  description: {
    type: String,
    required: true,
    default: "Step description goes here.",
  },
  image: { type: String, required: true, default: "./public/2.png" },
  icons: { type: [String], default: [] },
});

const HowToSellHPSchema = new mongoose.Schema(
  {
    homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "How to Sell" },
    description: {
      type: String,
      default: "Follow these simple steps to sell your items.",
    },
    buttonName: { type: String, required: true, default: "Start Selling" },
    buttonLink: {
      type: String,
      required: true,
      default: `${process.env.Frontend_URL}`,
    },
    cards: {
      type: [HowToSellCardSchema],
      default: [
        {
          title: "List Item",
          description: "Provide details about your item.",
          image: "./public/2.png",
        },
        {
          title: "Set Price",
          description: "Decide a fair price for your item.",
          image: "./public/2.png",
        },
        {
          title: "Complete Sale",
          description: "Confirm and finalize the transaction.",
          image: "./public/2.png",
        },
      ],
    },
  },
  { timestamps: true }
);

HowToSellHPSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "How to Sell",
      description: "Follow these simple steps to sell your items.",
      buttonName: "Start Selling",
      buttonLink: `${process.env.Frontend_URL}`,
      cards: [
        {
          title: "List Item",
          description: "Provide details about your item.",
          image: "./public/2.png",
        },
        {
          title: "Set Price",
          description: "Decide a fair price for your item.",
          image: "./public/2.png",
        },
        {
          title: "Complete Sale",
          description: "Confirm and finalize the transaction.",
          image: "./public/2.png",
        },
      ],
    });
    console.log("Default HowToSellHP document created");
  } else {
    console.log("HowToSellHP document already exists");
  }
};

module.exports = mongoose.model("HowToSellHP", HowToSellHPSchema);
