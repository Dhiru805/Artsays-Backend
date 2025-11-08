
const Testimonials = require("../../../../Models/aboutUs/sections/Testimonials");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const updateTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, mainHeading, mainDescription, status } = req.body;
    let testimonialsFromClient = req.body.testimonials;

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });
    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!mainHeading || !mainDescription) return res.status(400).json({ success: false, message: "Main heading and description are required" });

    const parsedTestimonials = typeof testimonialsFromClient === "string" ? JSON.parse(testimonialsFromClient) : testimonialsFromClient || [];
    if (!parsedTestimonials.length) return res.status(400).json({ success: false, message: "At least one testimonial is required" });

    parsedTestimonials.forEach((t, idx) => {
      if (!t.name || !t.description) throw new Error(`Testimonial ${idx + 1} requires name and description`);
    });

    let testimonialsDoc = null;

    if (id && id !== 'current') {
      testimonialsDoc = await Testimonials.findById(id);
      if (!testimonialsDoc) {
        return res.status(404).json({ success: false, message: "Testimonials document not found" });
      }
    } else {

      testimonialsDoc = await Testimonials.findOne({ aboutUsId });
      if (!testimonialsDoc) {
        return res.status(404).json({ success: false, message: "Testimonials section not found for this About Us page" });
      }
    }

    testimonialsDoc.mainHeading = mainHeading.trim();
    testimonialsDoc.mainDescription = mainDescription.trim();
    if (status) testimonialsDoc.status = status;
    
    testimonialsDoc.testimonials = parsedTestimonials.map(t => ({
      name: t.name.trim(),
      description: t.description.trim(),
    }));

    await testimonialsDoc.save();

    res.status(200).json({ 
      success: true, 
      data: testimonialsDoc, 
      message: "Testimonials updated successfully!" 
    });
  } catch (error) {
    console.error("Error updating Testimonials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateTestimonials;

