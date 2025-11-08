const Homepage = require("../../../Models/homePage/Homepage");

const createHomepage = async (req, res) => {
  try {
    const {
      title,
      status, 
      heroSection,
      browseCategories,
      whyBuyArtsays,
      biddingArena,
      howToBuyHP,
      howToSellHP,
      discoverArtist,
      whyArtsaysDifferent,
      challenges,
      artIcon,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    if (status === "published") {
      await Homepage.updateMany({ status: "published" }, { $set: { status: "draft" } });
    }

    const page = new Homepage({
      title,
      status: status || "draft", 
      heroSection,
      browseCategories,
      whyBuyArtsays,
      biddingArena,
      howToBuyHP,
      howToSellHP,
      discoverArtist,
      whyArtsaysDifferent,
      challenges,
      artIcon,
    });

    await page.save();

    res.status(201).json({ success: true, data: page, message: "Homepage created successfully!" });
    console.log("HOMEPAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating Homepage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createHomepage;
