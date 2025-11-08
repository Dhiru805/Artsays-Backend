const Homepage = require("../../../Models/homePage/Homepage");

const getPublishedHomepage = async (req, res) => {
  try {
    const page = await Homepage.findOne({ status: "published" })
      .populate(
        "heroSection browseCategories whyBuyArtsays biddingArena howToBuyHP howToSellHP discoverArtist whyArtsaysDifferent challenges artIcon"
      );

    if (!page)
      return res
        .status(404)
        .json({ success: false, message: "No published homepage found" });

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching published homepage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getPublishedHomepage;
