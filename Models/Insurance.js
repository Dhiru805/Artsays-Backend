// const mongoose = require("mongoose");

// const insuranceCMSchema = new mongoose.Schema(
//   {
//     section1Heading: { type: String, required: true },
//     section1Description: { type: String },

//     section1Cards: [
//       {
//         image: { type: String },
//         title: { type: String },
//         description: { type: String },
//       },
//     ],

//     section2Heading: { type: String },
//     section2Description: { type: String },

//     section2Cards: [
//       {
//         title: { type: String },
//         description: { type: String },
//       },
//     ],

//     section3Heading: { type: String },
//     section3Description: { type: String },

//     status: {
//       type: String,
//       enum: ["draft", "published"],
//       default: "draft",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("InsuranceCMS", insuranceCMSchema);


const mongoose = require("mongoose");

const insuranceCMSchema = new mongoose.Schema(
  {
    section1Heading: { type: String, required: true },
    section1Description: { type: String },

    section1Cards: [
      {
        image: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],

    section2Heading: { type: String },
    section2Description: { type: String },

    section2Cards: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],

    section3Heading: { type: String },
    section3Description: { type: String },

    section3Cards: [
      {
        heading: { type: String, trim: true },
        description: { type: String, trim: true },
        price: { type: String, trim: true },
        cancelCondition: { type: String, trim: true },
        eligibility: { type: String, trim: true },
        pointers: [{ type: String, trim: true }],
        buttonName: { type: String, trim: true },
        buttonLink: { type: String, trim: true },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InsuranceCMS", insuranceCMSchema);
