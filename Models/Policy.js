
const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);


// const mongoose = require("mongoose");

// const policySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "User ID is required"],
//     },
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     status: {
//       type: String,
//       enum: ["draft", "published", "archived"],
//       default: "draft",
//     },
//     seo: {
//       metaTitle: { type: String, default: "" },
//       metaDescription: { type: String, default: "" },
//       metaKeywords: { type: [String], default: [] },
//       metaAuthor: { type: String, default: "" },
//       metaImage: { type: String, default: "" }, 
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Policy", policySchema);
