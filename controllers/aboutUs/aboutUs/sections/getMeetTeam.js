
const MeetTeam = require("../../../../Models/aboutUs/sections/MeetTeam");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const getMeetTeam = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {
      
      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("meetTeam");
      if (aboutUsPage && aboutUsPage.meetTeam) {
        section = aboutUsPage.meetTeam;
      }
    } else {
      
      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("meetTeam");

      if (latestAboutUs?.meetTeam) {
        section = latestAboutUs.meetTeam;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Meet the Team section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Meet the Team section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getMeetTeam;
