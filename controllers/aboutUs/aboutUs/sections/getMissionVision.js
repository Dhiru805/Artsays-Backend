
const MissionVision = require("../../../../Models/aboutUs/sections/MissionVision");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const getMissionVision = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {
     
      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("missionVision");
      if (aboutUsPage && aboutUsPage.missionVision) {
        section = aboutUsPage.missionVision;
      }
    } else {
   
      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("missionVision");

      if (latestAboutUs?.missionVision) {
        section = latestAboutUs.missionVision;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Mission & Vision section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Mission & Vision section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getMissionVision;
