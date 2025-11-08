const Homepage = require("../../../../Models/homePage/Homepage");
const WhyArtsaysDifferent = require("../../../../Models/homePage/sections/whyArtsaysDifferent");

const getWhyArtsaysDifferent = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const homepage = await Homepage.findById(homepageId).populate("whyArtsaysDifferent");
      if (homepage?.whyArtsaysDifferent) section = homepage.whyArtsaysDifferent;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("whyArtsaysDifferent");
      if (latestHomepage?.whyArtsaysDifferent) section = latestHomepage.whyArtsaysDifferent;
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Why Artsays Different section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Why Artsays Different section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getWhyArtsaysDifferent;
