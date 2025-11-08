const Homepage = require("../../../../Models/homePage/Homepage");
const WhyBuyArtsays = require("../../../../Models/homePage/sections/whyBuyFromArtsays");

// const getWhyBuyArtsays = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("whyBuyArtsays");
//       if (homepage?.whyBuyArtsays) section = homepage.whyBuyArtsays;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("whyBuyArtsays");
//       if (latestHomepage?.whyBuyArtsays) section = latestHomepage.whyBuyArtsays;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Why Buy Artsays section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Why Buy Artsays section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getWhyBuyArtsays = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await WhyBuyArtsays.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await WhyBuyArtsays.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Why Buy Artsays section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Why Buy Artsays section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getWhyBuyArtsays;
