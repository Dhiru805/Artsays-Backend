
const Testimonials = require("../../../../Models/aboutUs/sections/Testimonials");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const getTestimonials = async (req, res) => {
  try {
    const { aboutUsId } = req.params; 

    let section = null;

    if (aboutUsId) {
      
      const aboutUsPage = await AboutUs.findById(aboutUsId).populate("testimonials");
      if (aboutUsPage && aboutUsPage.testimonials) {
        section = aboutUsPage.testimonials;
      }
    } else {
     
      const latestAboutUs = await AboutUs.findOne({ status: "published" })
        .sort({ createdAt: -1 })
        .populate("testimonials");

      if (latestAboutUs?.testimonials) {
        section = latestAboutUs.testimonials;
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: "Testimonials section not found" });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching Testimonials section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getTestimonials;
