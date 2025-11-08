

const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const WhatWeDo = require("../../../../Models/aboutUs/sections/WhatWeDo");
const path = require("path");

const updateWhatWeDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, heading, description, cards, status } = req.body;
    const files = req.files || [];

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });
    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!heading || !description) return res.status(400).json({ success: false, message: "Heading & Description are required" });

    let parsedCards = cards ? (typeof cards === "string" ? JSON.parse(cards) : cards) : [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    for (let i = 0; i < parsedCards.length; i++) {
      const c = parsedCards[i];
      if (!c.cardHeading || !c.cardDescription) {
        return res.status(400).json({ success: false, message: `Card ${i + 1} requires heading & description` });
      }
    }

    let section = null;
    

    if (id && id !== 'current') {
      section = await WhatWeDo.findById(id);
      if (!section) {
        return res.status(404).json({ success: false, message: "What We Do section not found" });
      }
    } else {

      section = await WhatWeDo.findOne({ aboutUsId });
      if (!section) {
        return res.status(404).json({ success: false, message: "What We Do section not found for this About Us page" });
      }
    }


    if (status === "published") {
      await WhatWeDo.updateMany(
        { _id: { $ne: section._id }, status: "published" }, 
        { status: "draft" }
      );
    }


    section.heading = heading.trim();
    section.description = description.trim();
    section.cards = parsedCards;
    
    if (status) {
      section.status = status;
    }


    const bannerFile = files.find(f => f.fieldname === "bannerImage");
    if (bannerFile) {
      section.image = path.join("uploads", "AboutUs", bannerFile.filename);
    }

    await section.save();

    res.status(200).json({
      success: true,
      data: section,
      message: "What We Do section updated successfully!",
    });
  } catch (error) {
    console.error("Error updating What We Do section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateWhatWeDo;
