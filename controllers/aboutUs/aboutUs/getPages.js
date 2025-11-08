
const AboutUs = require("../../../Models/aboutUs/AboutUs");

const getPages = async (req, res) => {
  try {
    const pages = await AboutUs.find()
      .populate("whoWeAre whatWeDo missionVision ourValues deliveryProcess meetTeam testimonials")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching About Us pages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getPages;
