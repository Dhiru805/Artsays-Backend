const mongoose = require("mongoose");

const ArtIconSchema = new mongoose.Schema(
  {
    homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },

    heading: { type: String, required: true, default: "Art & Innovation" },
    description: {
      type: String,
      required: true,
      default: "Showcasing our creative solutions and innovative projects that drive value.",
    },
    buttonName: { type: String, required: true, default: "Learn More" },
    buttonLink: { type: String, required: true, default: `${process.env.Frontend_URL}` },
  },
  { timestamps: true }
);

ArtIconSchema.statics.ensureDefault = async function (homepageId) {
  let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
       homepageId,
      heading: "Art & Innovation",
      description:
        "Showcasing our creative solutions and innovative projects that drive value.",
      buttonName: "Learn More",
      buttonLink: "${process.env.Frontend_URL}",
    });
    console.log("Default ArtIcon document created");
  } else {
    console.log("ArtIcon document already exists");
  }
};

module.exports = mongoose.model("ArtIcon", ArtIconSchema);
