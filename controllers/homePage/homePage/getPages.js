const Homepage = require("../../../Models/homePage/Homepage");

const getHomepages = async (req, res) => {
  try {
    const pages = await Homepage.find()
      .populate(
        "heroSection browseCategories whyBuyArtsays biddingArena howToBuyHP howToSellHP discoverArtist whyArtsaysDifferent challenges artIcon"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching Homepage pages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getHomepages;
