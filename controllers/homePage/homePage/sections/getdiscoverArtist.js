const Homepage = require("../../../../Models/homePage/Homepage");
const DiscoverArtist = require("../../../../Models/homePage/sections/discoverArtist");

// const getDiscoverArtist = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("discoverArtist");
//       if (homepage?.discoverArtist) section = homepage.discoverArtist;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("discoverArtist");
//       if (latestHomepage?.discoverArtist) section = latestHomepage.discoverArtist;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Discover Artist section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Discover Artist section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getDiscoverArtist = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await DiscoverArtist.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await DiscoverArtist.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Discover Artist section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Discover Artist section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getDiscoverArtist;
