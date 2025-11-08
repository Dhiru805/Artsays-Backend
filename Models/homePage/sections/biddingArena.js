// const mongoose = require("mongoose");

// const BiddingArenaSchema = new mongoose.Schema({
//  // homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String },
//   buttonName: { type: String, required: true },
//   buttonLink: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("BiddingArena", BiddingArenaSchema);


const mongoose = require("mongoose");

const BiddingArenaSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Bidding Arena" },
    description: {
      type: String,
      default: "Participate in exciting bids and explore our exclusive opportunities.",
    },
    buttonName: { type: String, required: true, default: "Join Now" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
  },
  { timestamps: true }
);

BiddingArenaSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Bidding Arena",
      description: "Participate in exciting bids and explore our exclusive opportunities.",
      buttonName: "Join Now",
      buttonLink: `${process.env.Frontend_URL}`,
    });
    console.log("Default BiddingArena document created");
  } else {
    console.log("BiddingArena document already exists");
  }
};

module.exports = mongoose.model("BiddingArena", BiddingArenaSchema);
