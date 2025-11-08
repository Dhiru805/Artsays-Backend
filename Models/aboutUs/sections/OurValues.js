// const mongoose = require("mongoose");

// const OurValuesCardSchema = new mongoose.Schema({
//   cardTitle: { type: String, required: true },
//   cardImage: { type: String, required: true },
// });

// const OurValuesSchema = new mongoose.Schema(
//   {
//    // aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     heading: { type: String, required: true },
//     description: { type: String, required: true },
//     cards: { type: [OurValuesCardSchema], default: [] },
//     //status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("OurValues", OurValuesSchema);



const mongoose = require("mongoose");

const OurValuesCardSchema = new mongoose.Schema({
  cardTitle: { type: String, required: true },
  cardImage: { type: String, required: true, default: "./public/2.png" },
});

const OurValuesSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    heading: {
      type: String,
      required: true,
      default: "Our Values",
    },
    description: {
      type: String,
      required: true,
      default:
        "Our core values guide our actions and decisions, shaping the culture and principles of our company.",
    },
    cards: {
      type: [OurValuesCardSchema],
      default: [
        { cardTitle: "Integrity", cardImage: "./public/2.png" },
        { cardTitle: "Innovation", cardImage: "./public/2.png" },
        { cardTitle: "Excellence", cardImage: "./public/2.png" },
      ],
    },
  },
  { timestamps: true }
);

OurValuesSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      heading: "Our Values",
      description:
        "Our core values guide our actions and decisions, shaping the culture and principles of our company.",
      cards: [
        { cardTitle: "Integrity", cardImage: "./public/2.png" },
        { cardTitle: "Innovation", cardImage: "./public/2.png" },
        { cardTitle: "Excellence", cardImage: "./public/2.png" },
      ],
    });
    console.log("Default OurValues document created");
  } else {
    console.log("OurValues document already exists");
  }
};

module.exports = mongoose.model("OurValues", OurValuesSchema);
