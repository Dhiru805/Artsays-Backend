// const mongoose = require("mongoose");

// const HowToBuyCardSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   icons: { type: [String], default: [] }, 
// });

// const HowToBuyHPSchema = new mongoose.Schema({
//  // homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String },
//   buttonName: { type: String, required: true },
//   buttonLink: { type: String, required: true },
//   cards: { type: [HowToBuyCardSchema], default: [] },
// }, { timestamps: true });

// module.exports = mongoose.model("HowToBuyHP", HowToBuyHPSchema);



const mongoose = require("mongoose");

const HowToBuyCardSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "Step Title" },
  description: { type: String, required: true, default: "Step description goes here." },
  image: { type: String, required: true, default: "./public/2.png" },
  icons: { type: [String], default: [] },
});

const HowToBuyHPSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "How to Buy" },
    description: { type: String, default: "Follow these simple steps to make a purchase." },
    buttonName: { type: String, required: true, default: "Start Buying" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
    cards: {
      type: [HowToBuyCardSchema],
      default: [
        { title: "Select Product", description: "Choose your desired item.", image: "./public/2.png" },
        { title: "Add to Cart", description: "Add items to your shopping cart.", image: "./public/2.png" },
        { title: "Checkout", description: "Complete your purchase securely.", image: "./public/2.png" },
      ],
    },
  },
  { timestamps: true }
);

HowToBuyHPSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "How to Buy",
      description: "Follow these simple steps to make a purchase.",
      buttonName: "Start Buying",
      buttonLink: `${process.env.Frontend_URL}`,
      cards: [
        { title: "Select Product", description: "Choose your desired item.", image: "./public/2.png" },
        { title: "Add to Cart", description: "Add items to your shopping cart.", image: "./public/2.png" },
        { title: "Checkout", description: "Complete your purchase securely.", image: "./public/2.png" },
      ],
    });
    console.log("Default HowToBuyHP document created");
  } else {
    console.log("HowToBuyHP document already exists");
  }
};

module.exports = mongoose.model("HowToBuyHP", HowToBuyHPSchema);
