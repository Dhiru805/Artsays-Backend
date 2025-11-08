const Homepage = require("../../../../Models/homePage/Homepage");
const BiddingArena = require("../../../../Models/homePage/sections/biddingArena");

// const getBiddingArena = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("biddingArena");
//       if (homepage?.biddingArena) section = homepage.biddingArena;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("biddingArena");
//       if (latestHomepage?.biddingArena) section = latestHomepage.biddingArena;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Bidding Arena section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Bidding Arena section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getBiddingArena = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await BiddingArena.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await BiddingArena.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Bidding Arena section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Bidding Arena section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getBiddingArena;
