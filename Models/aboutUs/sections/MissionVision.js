// const mongoose = require("mongoose");

// const MissionVisionCardSchema = new mongoose.Schema({
//   heading: { type: String, required: true },
//   description: { type: String, required: true },
//   icon: { type: String },          
//   sideImage: { type: String },    
// });

// const MissionVisionSchema = new mongoose.Schema(
//   {
//    // aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     cards: { type: [MissionVisionCardSchema], default: [] },
//    // status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MissionVision", MissionVisionSchema);














const mongoose = require("mongoose");

const MissionVisionCardSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "./public/2.png" },
  sideImage: { type: String, default: "./public/2.png" },
});

const MissionVisionSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    cards: { type: [MissionVisionCardSchema], default: [
      {
          heading: "Our Mission",
          description: "To deliver value and innovation in every project we undertake.",
          icon: "./public/2.png",
          sideImage: "./public/2.png",
        },
        {
          heading: "Our Vision",
          description: "To be a leading company recognized for excellence and impact.",
          icon: "./public/2.png",
          sideImage: "./public/2.png",
        },
    ] },
  },
  { timestamps: true }
);

MissionVisionSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      cards: [
        {
          heading: "Our Mission",
          description: "To deliver value and innovation in every project we undertake.",
          icon: "./public/2.png",
          sideImage: "./public/2.png",
        },
        {
          heading: "Our Vision",
          description: "To be a leading company recognized for excellence and impact.",
          icon: "./public/2.png",
          sideImage: "./public/2.png",
        },
      ],
    });
    console.log("Default MissionVision document created");
  } else {
    console.log("MissionVision document already exists");
  }
};

module.exports = mongoose.model("MissionVision", MissionVisionSchema);
