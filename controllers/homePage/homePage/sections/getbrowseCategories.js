const Homepage = require("../../../../Models/homePage/Homepage");
const BrowseCategories = require("../../../../Models/homePage/sections/browseCategories");

// const getBrowseCategories = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("browseCategories");
//       if (homepage?.browseCategories) section = homepage.browseCategories;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("browseCategories");
//       if (latestHomepage?.browseCategories) section = latestHomepage.browseCategories;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Browse Categories section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Browse Categories section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getBrowseCategories = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await BrowseCategories.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await BrowseCategories.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Browse Categories section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Browse Categories section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getBrowseCategories;
