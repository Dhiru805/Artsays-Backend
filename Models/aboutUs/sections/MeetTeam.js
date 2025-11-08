// const mongoose = require("mongoose");

// const TeamMemberSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   role: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
// });

// const MeetTeamSchema = new mongoose.Schema(
//   {
//    // aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     mainHeading: { type: String, required: true },
//     mainDescription: { type: String, required: true },
//     teamMembers: { type: [TeamMemberSchema], default: [] },
//     //status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MeetTeam", MeetTeamSchema);





const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true, default: "./public/2.png" },
});

const MeetTeamSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    mainHeading: { type: String, required: true, default: "Meet Our Team" },
    mainDescription: {
      type: String,
      required: true,
      default:
        "Our team is made up of talented and dedicated individuals committed to delivering excellence.",
    },
    teamMembers: {
      type: [TeamMemberSchema],
      default: [
        {
          name: "Alice Johnson",
          role: "CEO",
          description: "Leading the company with vision and passion.",
          image: "./public/2.png",
        },
        {
          name: "Bob Smith",
          role: "CTO",
          description: "Overseeing all technical projects and innovation.",
          image: "./public/2.png",
        },
        {
          name: "Carol Lee",
          role: "Project Manager",
          description: "Ensuring timely delivery and client satisfaction.",
          image: "./public/2.png",
        },
      ],
    },
  },
  { timestamps: true }
);

MeetTeamSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      mainHeading: "Meet Our Team",
      mainDescription:
        "Our team is made up of talented and dedicated individuals committed to delivering excellence.",
      teamMembers: [
        {
          name: "Alice Johnson",
          role: "CEO",
          description: "Leading the company with vision and passion.",
          image: "./public/2.png",
        },
        {
          name: "Bob Smith",
          role: "CTO",
          description: "Overseeing all technical projects and innovation.",
          image: "./public/2.png",
        },
        {
          name: "Carol Lee",
          role: "Project Manager",
          description: "Ensuring timely delivery and client satisfaction.",
          image: "./public/2.png",
        },
      ],
    });
    console.log("Default MeetTeam document created");
  } else {
    console.log("MeetTeam document already exists");
  }
};

module.exports = mongoose.model("MeetTeam", MeetTeamSchema);
