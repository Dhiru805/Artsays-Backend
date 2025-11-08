const Homepage = require("../../../../Models/homePage/Homepage");
const Challenges = require("../../../../Models/homePage/sections/challenges");

// const getChallenges = async (req, res) => {
//   try {
//     const { homepageId } = req.params;
//
//     let section = null;
//
//     if (homepageId) {
//       const homepage = await Homepage.findById(homepageId).populate("challenges");
//       if (homepage?.challenges) section = homepage.challenges;
//     } else {
//       const latestHomepage = await Homepage.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("challenges");
//       if (latestHomepage?.challenges) section = latestHomepage.challenges;
//     }
//
//     if (!section) {
//       return res.status(404).json({ success: false, message: "Challenges section not found" });
//     }
//
//     res.status(200).json({ success: true, data: section });
//   } catch (error) {
//     console.error("Error fetching Challenges section:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getChallenges = async (req, res) => {
  try {
    const { homepageId } = req.params;

    let section = null;

    if (homepageId) {
      const latest = await Challenges.findOne({ homepageId }).sort({ updatedAt: -1 });
      if (latest) section = latest;
    } else {
      const latestHomepage = await Homepage.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestHomepage) {
        const latest = await Challenges.findOne({ homepageId: latestHomepage._id }).sort({ updatedAt: -1 });
        if (latest) section = latest;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Challenges section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Challenges section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getChallenges;

