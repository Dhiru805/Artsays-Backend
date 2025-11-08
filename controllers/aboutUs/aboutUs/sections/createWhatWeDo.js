
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const WhatWeDo = require("../../../../Models/aboutUs/sections/WhatWeDo");
const path = require("path");

const createWhatWeDo = async (req, res) => {
  try {
    const { aboutUsId, heading, description, cards } = req.body;
    const files = req.files || [];

    if (!aboutUsId) {
      return res.status(400).json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res.status(404).json({ success: false, message: "About Us page not found" });
    }

    const bannerFile = files.find((f) => f.fieldname === "bannerImage");
    if (!bannerFile) {
      return res.status(400).json({ success: false, message: "Banner image is required" });
    }

   
    let parsedCards = cards ? (typeof cards === "string" ? JSON.parse(cards) : cards) : [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    if (!heading || !description) {
      return res.status(400).json({ success: false, message: "Heading & Description are required" });
    }

    for (let i = 0; i < parsedCards.length; i++) {
      const c = parsedCards[i];
      if (!c.cardHeading || !c.cardDescription) {
        return res.status(400).json({
          success: false,
          message: `Card ${i + 1} requires heading & description`,
        });
      }
    }

   
    const newSection = new WhatWeDo({
      aboutUsId,
      heading,
      description,
      image: path.join("uploads", "AboutUs", bannerFile.filename),
      cards: parsedCards,
    });

    await newSection.save();

    aboutUsPage.whatWeDo = newSection._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: newSection,
      message: "What We Do section created successfully!",
    });
  } catch (error) {
    console.error("Error creating What We Do section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createWhatWeDo;







