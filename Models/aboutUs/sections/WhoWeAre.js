// const mongoose = require("mongoose");

// const StatSchema = new mongoose.Schema({
//   number: { type: String, required: true },
//   label: { type: String, required: true },
// });

// const WhoWeAreSchema = new mongoose.Schema(
//   {
//     //aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true }, 
//     heading: { type: String, required: true },
//     description: { type: String, required: true },
//     image1: { type: String }, // optional
//     //image2: { type: String }, 
//     stats: { type: [StatSchema], default: [] }, 
//    // status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("WhoWeAre", WhoWeAreSchema);




const mongoose = require("mongoose");

const StatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
});

const WhoWeAreSchema = new mongoose.Schema(
  {
    aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },

    heading: {
      type: String,
      required: true,
      default: "Who We Are",
    },
    description: {
      type: String,
      required: true,
      default:
        "We are a passionate team committed to delivering meaningful solutions and creating lasting value for our clients.",
    },
    image1: {
      type: String,
      required: true,
      default: "./public/2.png",
    },
    stats: {
      type: [StatSchema],
      default: [
        { number: "100+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "10+", label: "Years of Experience" },
      ],
    },
  },
  { timestamps: true }
);

WhoWeAreSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      heading: "Who We Are",
      description:
        "We are a passionate team committed to delivering meaningful solutions and creating lasting value for our clients.",
      image1: "./public/2.png",
      stats: [
        { number: "100+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "10+", label: "Years of Experience" },
      ],
    });
    console.log("Default Who We Are document created");
  } else {
    console.log("Who We Are document already exists");
  }
};

module.exports = mongoose.model("WhoWeAre", WhoWeAreSchema);
