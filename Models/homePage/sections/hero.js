// const mongoose = require("mongoose");

// const RecurrentTitleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   image: { type: String, required: true },
//   duration: { type: Number, required: true }, // in seconds
// });

// const HeroSectionSchema = new mongoose.Schema({
//   //homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   recurrentTitles: { type: [RecurrentTitleSchema], default: [] },
//   buttons: [
//     {
//       name: { type: String, required: true },
//       link: { type: String, required: true },
//     }
//   ],
// }, { timestamps: true });

// module.exports = mongoose.model("HeroSection", HeroSectionSchema);





const mongoose = require("mongoose");

const RecurrentTitleSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "Welcome to Our Platform" },
  image: { type: String, required: true, default: `${process.env.Frontend_URL}` },
  duration: { type: Number, required: true, default: 5 },
});

const HeroSectionSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    title: { type: String, required: true, default: "Hero Section Title" },
    description: {
      type: String,
      required: true,
      default: "Engaging description to capture user attention.",
    },
    recurrentTitles: {
      type: [RecurrentTitleSchema],
      default: [
        { title: "Welcome to Our Platform", image: `${process.env.Frontend_URL}`, duration: 5 },
        { title: "Explore Our Services", image: `${process.env.Frontend_URL}`, duration: 5 },
      ],
    },
    buttons: {
      type: [
        {
          name: { type: String, required: true, default: "Get Started" },
          link: { type: String, required: true, default: `${process.env.Frontend_URL}` },
        }
      ],
      default: [
        { name: "Get Started", link: `${process.env.Frontend_URL}` },
        { name: "Learn More", link: `${process.env.Frontend_URL}` },
      ],
    },
  },
  { timestamps: true }
);

HeroSectionSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      title: "Hero Section Title",
      description: "Engaging description to capture user attention.",
      recurrentTitles: [
        { title: "Welcome to Our Platform", image: `${process.env.Frontend_URL}`, duration: 5 },
        { title: "Explore Our Services", image: `${process.env.Frontend_URL}`, duration: 5 },
      ],
      buttons: [
        { name: "Get Started", link: `${process.env.Frontend_URL}` },
        { name: "Learn More", link: `${process.env.Frontend_URL}` },
      ],
    });
    console.log("Default HeroSection document created");
  } else {
    console.log("HeroSection document already exists");
  }
};

module.exports = mongoose.model("HeroSection", HeroSectionSchema);
