const Homepage = require("../../../../Models/homePage/Homepage");
const ArtIcon = require("../../../../Models/homePage/sections/artIcon");

// const getArtIcon = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("artIcon");
//       if (homepage?.artIcon) section = homepage.artIcon;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("artIcon");
//       if (latestHomepage?.artIcon) section = latestHomepage.artIcon;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Art Icon section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Art Icon section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getArtIcon = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await ArtIcon.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await ArtIcon.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Art Icon section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Art Icon section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getArtIcon;

