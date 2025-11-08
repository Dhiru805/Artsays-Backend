
const AboutUs = require("../../../Models/aboutUs/AboutUs");

const getPublishedPage = async (req, res) => {
  try {
    const page = await AboutUs.findOne({ status: "published" })
      .populate("whoWeAre whatWeDo missionVision ourValues deliveryProcess meetTeam testimonials");

    if (!page) return res.status(404).json({ success: false, message: "No published page found" });

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching published About Us page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getPublishedPage;
