const mongoose = require("mongoose");

const HomepageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },

    heroSection: { type: mongoose.Schema.Types.ObjectId, ref: "HeroSection" },
    browseCategories: { type: mongoose.Schema.Types.ObjectId, ref: "BrowseCategories" },
    whyBuyArtsays: { type: mongoose.Schema.Types.ObjectId, ref: "WhyBuyArtsays" },
    biddingArena: { type: mongoose.Schema.Types.ObjectId, ref: "BiddingArena" },
    howToBuyHP: { type: mongoose.Schema.Types.ObjectId, ref: "HowToBuyHP" },
    discoverArtist: { type: mongoose.Schema.Types.ObjectId, ref: "DiscoverArtist" },
    whyArtsaysDifferent: { type: mongoose.Schema.Types.ObjectId, ref: "WhyArtsaysDifferent" },
    challenges: { type: mongoose.Schema.Types.ObjectId, ref: "Challenges" },
    artIcon: { type: mongoose.Schema.Types.ObjectId, ref: "ArtIcon" },
    howToSellHP: { type: mongoose.Schema.Types.ObjectId, ref: "HowToSellHP" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homepage", HomepageSchema);
