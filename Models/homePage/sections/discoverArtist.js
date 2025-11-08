
// const mongoose = require("mongoose");

// const DiscoverArtistSchema = new mongoose.Schema({
//  // homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage", required: true },
//   heading: { type: String, required: true },
//   description: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("DiscoverArtist", DiscoverArtistSchema);



const mongoose = require("mongoose");

const DiscoverArtistSchema = new mongoose.Schema(
  {homepageId: { type: mongoose.Schema.Types.ObjectId, ref: "Homepage" },
    heading: { type: String, required: true, default: "Discover Artists" },
    description: {
      type: String,
      required: true,
      default: "Explore talented artists and their unique creations from around the world.",
    },
  },
  { timestamps: true }
);

DiscoverArtistSchema.statics.ensureDefault = async function (homepageId) {
 let doc = await this.findOne({ homepageId });
  if (!doc) {
    await this.create({
      homepageId,
      heading: "Discover Artists",
      description: "Explore talented artists and their unique creations from around the world.",
    });
    console.log("Default DiscoverArtist document created");
  } else {
    console.log("DiscoverArtist document already exists");
  }
};

module.exports = mongoose.model("DiscoverArtist", DiscoverArtistSchema);
