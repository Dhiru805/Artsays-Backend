// const mongoose = require("mongoose");
// const StepSchema = new mongoose.Schema({
//   stepTitle: { type: String, required: true },
//   stepDescription: { type: String },
//   stepImage: { type: String },
// });

// const DeliveryProcessSchema = new mongoose.Schema(
//   {
//     //aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     heading: { type: String, required: true },
//     description: { type: String },
//     steps: { type: [StepSchema], default: [] },
//     //status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("DeliveryProcess", DeliveryProcessSchema);




const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  stepTitle: { type: String, required: true },
  stepDescription: { type: String },
});

const DeliveryProcessSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    heading: { type: String, required: true, default: "Our Delivery Process" },
    description: {
      type: String,
      default: "We follow a structured process to ensure successful project delivery.",
    },
    steps: {
      type: [StepSchema],
      default: [
        {
          stepTitle: "Planning",
          stepDescription: "Understanding client requirements and project scope.",
        
        },
        {
          stepTitle: "Design & Development",
          stepDescription: "Creating and building the solution with best practices.",
         
        },
        {
          stepTitle: "Testing & Deployment",
          stepDescription: "Ensuring quality and deploying the solution successfully.",
         
        },
      ],
    },
  },
  { timestamps: true }
);

DeliveryProcessSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      heading: "Our Delivery Process",
      description: "We follow a structured process to ensure successful project delivery.",
      steps: [
        {
          stepTitle: "Planning",
          stepDescription: "Understanding client requirements and project scope.",
        
        },
        {
          stepTitle: "Design & Development",
          stepDescription: "Creating and building the solution with best practices.",
          
        },
        {
          stepTitle: "Testing & Deployment",
          stepDescription: "Ensuring quality and deploying the solution successfully.",
          
        },
      ],
    });
    console.log("Default DeliveryProcess document created");
  } else {
    console.log("DeliveryProcess document already exists");
  }
};

module.exports = mongoose.model("DeliveryProcess", DeliveryProcessSchema);
