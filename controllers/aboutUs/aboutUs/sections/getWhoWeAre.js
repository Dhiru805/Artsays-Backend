
const WhoWeAre = require("../../../../Models/aboutUs/sections/WhoWeAre");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

// const getWhoWeAre = async (req, res) => {
//   try {
//     const { aboutUsId } = req.params;
//
//     let whoWeAreSection = null;
//
//     if (aboutUsId) {
//
//       const aboutUsPage = await AboutUs.findById(aboutUsId).populate("whoWeAre");
//
//       if (aboutUsPage && aboutUsPage.whoWeAre) {
//         whoWeAreSection = aboutUsPage.whoWeAre;
//       }
//     } else {
//       const latestAboutUs = await AboutUs.findOne({ status: "published" })
//         .sort({ createdAt: -1 })
//         .populate("whoWeAre");
//
//       if (latestAboutUs?.whoWeAre) {
//         whoWeAreSection = latestAboutUs.whoWeAre;
//       }
//     }
//
//     if (!whoWeAreSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Who We Are section not found",
//       });
//     }
//
//     return res.status(200).json({ success: true, data: whoWeAreSection });
//   } catch (error) {
//     console.error("Error fetching Who We Are section:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };
//
// module.exports = getWhoWeAre;



// const WhoWeAre = require("../../../../Models/aboutUs/sections/WhoWeAre");
// const AboutUs = require("../../../../Models/aboutUs/AboutUs");
//
const getWhoWeAre = async (req, res) => {
  try {
    const { aboutUsId } = req.params;

    let whoWeAreSection = null;

    if (aboutUsId) {
      const latest = await WhoWeAre.findOne({ aboutUsId })
        .sort({ updatedAt: -1 });
      if (latest) whoWeAreSection = latest;
    } else {
      const latestAboutUs = await AboutUs.findOne({ status: "published" }).sort({ createdAt: -1 });
      if (latestAboutUs) {
        const latest = await WhoWeAre.findOne({ aboutUsId: latestAboutUs._id })
          .sort({ updatedAt: -1 });
        if (latest) whoWeAreSection = latest;
      }
    }

    if (!whoWeAreSection) {
      return res.status(404).json({ success: false, message: "Who We Are section not found" });
    }

    return res.status(200).json({ success: true, data: whoWeAreSection });
  } catch (error) {
    console.error("Error fetching Who We Are section:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getWhoWeAre;