// const mongoose = require("mongoose");

// const ChallengesSchema = new mongoose.Schema({
//   //homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Challenges", ChallengesSchema);


const mongoose = require("mongoose");

const ChallengesSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Our Challenges" },
    description: {
      type: String,
      required: true,
      default: "We overcome obstacles and innovate to deliver the best solutions for our clients.",
    },
  },
  { timestamps: true }
);

ChallengesSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Our Challenges",
      description:
        "We overcome obstacles and innovate to deliver the best solutions for our clients.",
    });
    console.log("Default Challenges document created");
  } else {
    console.log("Challenges document already exists");
  }
};

module.exports = mongoose.model("Challenges", ChallengesSchema);

