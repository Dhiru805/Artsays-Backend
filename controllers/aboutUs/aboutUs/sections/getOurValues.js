
const OurValues = require("../../../../Models/aboutUs/sections/OurValues");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const getOurValues = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {
     
      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("ourValues");
      if (aboutUsPage && aboutUsPage.ourValues) {
        section = aboutUsPage.ourValues;
      }
    } else {
    
      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("ourValues");

      if (latestAboutUs?.ourValues) {
        section = latestAboutUs.ourValues;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Our Values section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Our Values section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getOurValues;
