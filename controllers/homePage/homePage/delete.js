const Homepage = require("../../../Models/homePage/Homepage");
const HeroSection = require("../../../Models/homePage/sections/hero");
const BrowseCategories = require("../../../Models/homePage/sections/browseCategories");
const WhyBuyArtsays = require("../../../Models/homePage/sections/whyBuyFromArtsays");
const BiddingArena = require("../../../Models/homePage/sections/biddingArena");
const HowToBuyHP = require("../../../Models/homePage/sections/howToBuy");
const HowToSellHP = require("../../../Models/homePage/sections/howToSell");
const DiscoverArtist = require("../../../Models/homePage/sections/discoverArtist");
const WhyArtsaysDifferent = require("../../../Models/homePage/sections/whyArtsaysDifferent");
const Challenges = require("../../../Models/homePage/sections/challenges");
const ArtIcon = require("../../../Models/homePage/sections/artIcon");

const deleteHomepage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await Homepage.findById(id);
    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "Homepage not found" });

    const sections = [
      { model: HeroSection, id: page.heroSection },
      { model: BrowseCategories, id: page.browseCategories },
      { model: WhyBuyArtsays, id: page.whyBuyArtsays },
      { model: BiddingArena, id: page.biddingArena },
      { model: HowToBuyHP, id: page.howToBuyHP },
      { model: HowToSellHP, id: page.howToSellHP },
      { model: DiscoverArtist, id: page.discoverArtist },
      { model: WhyArtsaysDifferent, id: page.whyArtsaysDifferent },
      { model: Challenges, id: page.challenges },
      { model: ArtIcon, id: page.artIcon },
    ];

    for (const sec of sections) {
      if (sec.id) await sec.model.findByIdAndDelete(sec.id);
    }

    await Homepage.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Homepage and all sections deleted successfully",
    });
    console.log("HOMEPAGE DELETED:", id);
  } catch (error) {
    console.error("Error deleting Homepage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = deleteHomepage;
