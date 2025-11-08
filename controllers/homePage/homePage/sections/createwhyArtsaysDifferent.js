
const Homepage = require("../../../../Models/homePage/Homepage");
const WhyArtsaysDifferent = require("../../../../Models/homePage/sections/whyArtsaysDifferent");

const createWhyArtsaysDifferent = async (req, res) => {
  try {
    const { homepageId, heading, description, buttonName, buttonLink, cards } = req.body;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !description || !buttonName || !buttonLink) {
      return res.status(400).json({
        success: false,
        message: "Heading, description, buttonName, and buttonLink are required"
      });
    }

    let parsedCards = [];
    if (cards) {
      parsedCards = typeof cards === "string" ? JSON.parse(cards) : cards;
      if (!Array.isArray(parsedCards)) parsedCards = [];
    }

    const files = req.files || [];
    parsedCards = parsedCards.map((c, i) => {
      const f = files.find(x => x.fieldname === `cards[${i}][icon]`);
      if (f) {
        c.icon = require("path").join("uploads", "homePage", f.filename);
      }
      return c;
    });
    for (let i = 0; i < parsedCards.length; i++) {
      const c = parsedCards[i];
      if (!c.title || !c.description || !c.hexColor || !c.icon) {
        return res.status(400).json({
          success: false,
          message: `Card ${i + 1} requires title, description, hexColor, and icon`
        });
      }
    }

    const newSection = new WhyArtsaysDifferent({
      homepageId,
      heading,
      description,
      buttonName,
      buttonLink,
      cards: parsedCards,
    });

    await newSection.save();

    homepage.whyArtsaysDifferent = newSection._id;
    await homepage.save();

    res.status(201).json({
      success: true,
      data: newSection,
      message: "Why Artsays Different section created successfully!"
    });

  } catch (error) {
    console.error("Error creating Why Artsays Different section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createWhyArtsaysDifferent;
