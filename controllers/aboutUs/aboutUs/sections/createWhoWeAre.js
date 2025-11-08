
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const WhoWeAre = require("../../../../Models/aboutUs/sections/WhoWeAre");
const path = require("path");

const createWhoWeAre = async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ FILES:", req.files);

  try {
    const { aboutUsId, heading, description, stats } = req.body; 
    const files = req.files || [];

    if (!aboutUsId) {
      return res.status(400).json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res.status(404).json({ success: false, message: "Main About Us page not found" });
    }

    let parsedStats = stats ? (typeof stats === "string" ? JSON.parse(stats) : stats) : [];
    if (!Array.isArray(parsedStats)) parsedStats = [];

    if (!heading || !description) {
      return res.status(400).json({ success: false, message: "Heading & Description are required" });
    }

    for (let i = 0; i < parsedStats.length; i++) {
      const s = parsedStats[i];
      if (!s.number || !s.label) {
        return res.status(400).json({
          success: false,
          message: `Stat ${i + 1} requires number and label`,
        });
      }
    }

    const image1File = files.find((f) => f.fieldname === "image1");
    const image2File = files.find((f) => f.fieldname === "image2");

    const whoWeAreSection = new WhoWeAre({
      aboutUsId,
      heading,
      description,
      stats: parsedStats,
      image1: image1File ? path.join("uploads", "AboutUs", image1File.filename) : null,
      image2: image2File ? path.join("uploads", "AboutUs", image2File.filename) : null,
    });

    await whoWeAreSection.save();

    aboutUsPage.whoWeAre = whoWeAreSection._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: whoWeAreSection,
      message: "Who We Are section created and linked successfully!",
    });
  } catch (error) {
    console.error("Error creating Who We Are section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createWhoWeAre;






