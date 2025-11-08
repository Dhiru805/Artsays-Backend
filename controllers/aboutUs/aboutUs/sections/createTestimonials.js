
const Testimonials = require("../../../../Models/aboutUs/sections/Testimonials");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const createTestimonials = async (req, res) => {
  try {
    const { aboutUsId, mainHeading, mainDescription } = req.body; 
    let testimonialsFromClient = req.body.testimonials;

    if (!aboutUsId) {
      return res.status(400).json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res.status(404).json({ success: false, message: "About Us page not found" });
    }

    if (!mainHeading || !mainDescription) {
      return res.status(400).json({ success: false, message: "Main heading and description are required" });
    }

    const parsedTestimonials =
      typeof testimonialsFromClient === "string"
        ? JSON.parse(testimonialsFromClient)
        : testimonialsFromClient || [];

    if (!parsedTestimonials.length) {
      return res.status(400).json({ success: false, message: "At least one testimonial is required" });
    }

    parsedTestimonials.forEach((t, idx) => {
      if (!t.name || !t.description) {
        throw new Error(`Testimonial ${idx + 1} requires name and description`);
      }
    });

    const testimonialsDoc = new Testimonials({
      aboutUsId,
      mainHeading: mainHeading.trim(),
      mainDescription: mainDescription.trim(),
      testimonials: parsedTestimonials.map((t) => ({
        name: t.name.trim(),
        description: t.description.trim(),
      })),
    });

    await testimonialsDoc.save();

    
    aboutUsPage.testimonials = testimonialsDoc._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: testimonialsDoc,
      message: "Testimonials created and linked successfully!",
    });
  } catch (error) {
    console.error("Error creating Testimonials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createTestimonials;







