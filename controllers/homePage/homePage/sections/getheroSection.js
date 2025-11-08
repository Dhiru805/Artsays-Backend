const Homepage = require("../../../../Models/homePage/Homepage");
const HeroSection = require("../../../../Models/homePage/sections/hero");

// const getHeroSection = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("heroSection");
//       if (homepage?.heroSection) section = homepage.heroSection;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("heroSection");
//       if (latestHomepage?.heroSection) section = latestHomepage.heroSection;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Hero Section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Hero Section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getHeroSection = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await HeroSection.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await HeroSection.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Hero Section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Hero Section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getHeroSection;