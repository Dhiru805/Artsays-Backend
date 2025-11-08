
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const WhoWeAre = require("../../../../Models/aboutUs/sections/WhoWeAre");
const path = require("path");

const updateWhoWeAre = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, heading, description, stats, status } = req.body;
    const files = req.files || [];

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });
    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!heading || !description) return res.status(400).json({ success: false, message: "Heading & Description are required" });

  
    let parsedStats = stats ? (typeof stats === "string" ? JSON.parse(stats) : stats) : [];
    if (!Array.isArray(parsedStats)) parsedStats = [];

    for (let i = 0; i < parsedStats.length; i++) {
      const s = parsedStats[i];
      if (!s.number || !s.label) return res.status(400).json({ success: false, message: `Stat ${i + 1} requires number and label` });
    }

    let whoWeAreSection = null;
    
 
    if (id && id !== 'current') {
      whoWeAreSection = await WhoWeAre.findById(id);
      if (!whoWeAreSection) {
        return res.status(404).json({ success: false, message: "Who We Are section document not found" });
      }
    } else {
  
      whoWeAreSection = await WhoWeAre.findOne({ aboutUsId });
      if (!whoWeAreSection) {
        return res.status(404).json({ success: false, message: "Who We Are section not found for this About Us page" });
      }
    }


    const image1File = files.find(f => f.fieldname === "image1");
    const image2File = files.find(f => f.fieldname === "image2");

    whoWeAreSection.heading = heading.trim();
    whoWeAreSection.description = description.trim();
    whoWeAreSection.stats = parsedStats;
    
    if (status) {
      whoWeAreSection.status = status;
    }
    
    if (image1File) {
      whoWeAreSection.image1 = path.join("uploads", "AboutUs", image1File.filename);
    }
    if (image2File) {
      whoWeAreSection.image2 = path.join("uploads", "AboutUs", image2File.filename);
    }

    await whoWeAreSection.save();

    res.status(200).json({
      success: true,
      data: whoWeAreSection,
      message: "Who We Are section updated successfully!",
    });
  } catch (error) {
    console.error("Error updating Who We Are section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateWhoWeAre;
