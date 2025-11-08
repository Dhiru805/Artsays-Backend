const Homepage = require("../../../Models/homePage/Homepage");

const updateHomepage = async (req, res) => {
  try {
    const { id } = req.params;
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

    const page = await Homepage.findById(id);
    if (!page)
      return res.status(404).json({ success: false, message: "Homepage not found" });

   
    if (title) page.title = title;

    if (heroSection) page.heroSection = heroSection;
    if (browseCategories) page.browseCategories = browseCategories;
    if (whyBuyArtsays) page.whyBuyArtsays = whyBuyArtsays;
    if (biddingArena) page.biddingArena = biddingArena;
    if (howToBuyHP) page.howToBuyHP = howToBuyHP;
    if (howToSellHP) page.howToSellHP = howToSellHP;
    if (discoverArtist) page.discoverArtist = discoverArtist;
    if (whyArtsaysDifferent) page.whyArtsaysDifferent = whyArtsaysDifferent;
    if (challenges) page.challenges = challenges;
    if (artIcon) page.artIcon = artIcon;

   
    if (status === "published") {
      await Homepage.updateMany({ status: "published" }, { $set: { status: "draft" } });
      page.status = "published";
    } else if (status) {
      page.status = status; 
    }

    await page.save();

    res.status(200).json({
      success: true,
      data: page,
      message: "Homepage updated successfully!",
    });
    console.log("HOMEPAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Homepage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateHomepage;
