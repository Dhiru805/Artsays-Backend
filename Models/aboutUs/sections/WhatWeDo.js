
// const mongoose = require("mongoose");

// const CardSchema = new mongoose.Schema({
//   cardHeading: { type: String, required: true },
//   cardDescription: { type: String, required: true },
// });

// const WhatWeDoSchema = new mongoose.Schema(
//   {
//     //aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     heading: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String, required: true },
//     cards: { type: [CardSchema], default: [] },
//     //status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("WhatWeDo", WhatWeDoSchema);





const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  cardHeading: { type: String, required: true },
  cardDescription: { type: String, required: true },
});

const WhatWeDoSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    heading: { type: String, required: true, default: "What We Do" },
    description: {
      type: String,
      required: true,
      default:
        "We offer a range of innovative services designed to help our clients grow, scale, and achieve their goals.",
    },
    image: { type: String, required: true, default: "./public/2.png" },
    cards: {
      type: [CardSchema],
      default: [
        {
          cardHeading: "Custom Software Development",
          cardDescription:
            "Building scalable, reliable, and user-focused software solutions tailored to client needs.",
        },
        {
          cardHeading: "UI/UX Design",
          cardDescription:
            "Crafting seamless and engaging user experiences that align with brand identity and purpose.",
        },
        {
          cardHeading: "Digital Transformation",
          cardDescription:
            "Empowering businesses with modern technologies to enhance efficiency and competitiveness.",
        },
      ],
    },
  },
  { timestamps: true }
);

WhatWeDoSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      heading: "What We Do",
      description:
        "We offer a range of innovative services designed to help our clients grow, scale, and achieve their goals.",
      image: "./public/2.png",
      cards: [
        {
          cardHeading: "Custom Software Development",
          cardDescription:
            "Building scalable, reliable, and user-focused software solutions tailored to client needs.",
        },
        {
          cardHeading: "UI/UX Design",
          cardDescription:
            "Crafting seamless and engaging user experiences that align with brand identity and purpose.",
        },
        {
          cardHeading: "Digital Transformation",
          cardDescription:
            "Empowering businesses with modern technologies to enhance efficiency and competitiveness.",
        },
      ],
    });
  }
};

module.exports = mongoose.model("WhatWeDo", WhatWeDoSchema);
