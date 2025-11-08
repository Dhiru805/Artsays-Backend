// const mongoose = require("mongoose");

// const TagSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   icon: { type: String, required: true },
// });

// const BrowseCategoriesSchema = new mongoose.Schema({
//  // homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String, required: true },
//   buttonName: { type: String, required: true },
//   buttonLink: { type: String, required: true },
//   tags: { type: [TagSchema], default: [] },
// }, { timestamps: true });

// module.exports = mongoose.model("BrowseCategories", BrowseCategoriesSchema);




const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "Category" },
  icon: { type: String, required: true, default: "./public/2.png" },
});

const BrowseCategoriesSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Browse Categories" },
    description: {
      type: String,
      required: true,
      default: "Explore our diverse range of categories and find what interests you.",
    },
    buttonName: { type: String, required: true, default: "See All" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
    tags: {
      type: [TagSchema],
      default: [
        { title: "Art", icon: "./public/2.png" },
        { title: "Music", icon: "./public/2.png" },
        { title: "Technology", icon: "./public/2.png" },
      ],
    },
  },
  { timestamps: true }
);

BrowseCategoriesSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Browse Categories",
      description: "Explore our diverse range of categories and find what interests you.",
      buttonName: "See All",
      buttonLink: `${process.env.Frontend_URL}`,
      tags: [
        { title: "Art", icon: "./public/2.png" },
        { title: "Music", icon: "./public/2.png" },
        { title: "Technology", icon: "./public/2.png" },
      ],
    });
    console.log("Default BrowseCategories document created");
  } else {
    console.log("BrowseCategories document already exists");
  }
};

module.exports = mongoose.model("BrowseCategories", BrowseCategoriesSchema);
