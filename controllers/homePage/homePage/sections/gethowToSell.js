const Homepage = require("../../../../Models/homePage/Homepage");
const HowToSell = require("../../../../Models/homePage/sections/howToSell");

// const getHowToSell = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("howToSellHP");
//       section = homepage?.howToSellHP || null;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("howToSellHP");
//       section = latestHomepage?.howToSellHP || null;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "How To Sell section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching How To Sell section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getHowToSell = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await HowToSell.findOne({ homepageId }).sort({
        updatedAt: -1,
      });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({
        status: "published",
      }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await HowToSell.findOne({
          homepageId: latestHomepage._id,
        }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "How To Sell section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching How To Sell section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getHowToSell;
