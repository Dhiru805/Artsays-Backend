const Homepage = require("../../../../Models/homePage/Homepage");
const HowToBuy = require("../../../../Models/homePage/sections/howToBuy");

// const getHowToBuy = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("howToBuyHP");
//       if (homepage?.howToBuyHP) section = homepage.howToBuyHP;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("howToBuyHP");
//       if (latestHomepage?.howToBuyHP) section = latestHomepage.howToBuyHP;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "How To Buy section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching How To Buy section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getHowToBuy = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await HowToBuy.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await HowToBuy.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "How To Buy section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching How To Buy section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getHowToBuy;
