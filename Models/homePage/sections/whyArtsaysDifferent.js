// const mongoose = require("mongoose");

// const WhyArtsaysCardSchema = new mongoose.Schema({
//   title: { type: String, required: true },        
//   description: { type: String, required: true },  
//   hexColor: { type: String, required: true },    
//   icon: { type: String, required: true },         
// });

// const WhyArtsaysDifferentSchema = new mongoose.Schema({
//   //homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },       
//   description: { type: String, required: true }, 
//   buttonName: { type: String, required: true },   
//   buttonLink: { type: String, required: true },  
//   cards: { type: [WhyArtsaysCardSchema], default: [] },
// }, { timestamps: true });

// module.exports = mongoose.model("WhyArtsaysDifferent", WhyArtsaysDifferentSchema);



const mongoose = require("mongoose");

const WhyArtsaysCardSchema = new mongoose.Schema({
  title: { type: String, required: true, default: "Card Title" },
  description: { type: String, required: true, default: "Card description goes here." },
  hexColor: { type: String, required: true, default: "#000000" },
  icon: { type: String, required: true, default: "./public/2.png" },
});

const WhyArtsaysDifferentSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Why Artsays" },
    description: { type: String, required: true, default: "Reasons to choose Artsays." },
    buttonName: { type: String, required: true, default: "Learn More" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
    cards: {
      type: [WhyArtsaysCardSchema],
      default: [
        { title: "Quality", description: "Top-notch quality services.", hexColor: "#FF5733", icon: "./public/2.png" },
        { title: "Reliability", description: "Dependable solutions every time.", hexColor: "#33C1FF", icon: "./public/2.png" },
        { title: "Innovation", description: "Creative and forward-thinking approach.", hexColor: "#33FF57", icon: "./public/2.png" },
      ],
    },
  },
  { timestamps: true }
);

WhyArtsaysDifferentSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Why Artsays",
      description: "Reasons to choose Artsays.",
      buttonName: "Learn More",
      buttonLink: `${process.env.Frontend_URL}`,
      cards: [
        { title: "Quality", description: "Top-notch quality services.", hexColor: "#FF5733", icon: "./public/2.png" },
        { title: "Reliability", description: "Dependable solutions every time.", hexColor: "#33C1FF", icon: "./public/2.png" },
        { title: "Innovation", description: "Creative and forward-thinking approach.", hexColor: "#33FF57", icon: "./public/2.png" },
      ],
    });
    console.log("Default WhyArtsaysDifferent document created");
  } else {
    console.log("WhyArtsaysDifferent document already exists");
  }
};

module.exports = mongoose.model("WhyArtsaysDifferent", WhyArtsaysDifferentSchema);
