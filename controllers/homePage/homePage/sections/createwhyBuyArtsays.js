
const Homepage = require("../../../../Models/homePage/Homepage");
const WhyBuyArtsays = require("../../../../Models/homePage/sections/whyBuyFromArtsays");
const path = require("path");

const createWhyBuyArtsays = async (req, res) => {
  try {
    const { homepageId, heading, description, buttonName, buttonLink, cards } = req.body;
    const files = req.files || [];

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !buttonName || !buttonLink) {
      return res.status(400).json({
        success: false,
        message: "Heading, buttonName, and buttonLink are required"
      });
    }

    let parsedCards = cards ? (typeof cards === "string" ? JSON.parse(cards) : cards) : [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    parsedCards = parsedCards.map((c, index) => {
      if (!c.heading || !c.description) {
        throw new Error(`Card ${index + 1} requires heading and description`);
      }
      const file = files.find(f => f.fieldname === `cards[${index}][icon]`);
      if (!file) {
        throw new Error(`Card ${index + 1} icon file is required`);
      }

      c.icon = path.join("uploads", "homePage", file.filename);
      return c;
    });

    const newSection = new WhyBuyArtsays({
      homepageId,
      heading,
      description: description || "",
      buttonName,
      buttonLink,
      cards: parsedCards,
    });

    await newSection.save();

    homepage.whyBuyArtsays = newSection._id;
    await homepage.save();

    res.status(201).json({
      success: true,
      data: newSection,
      message: "Why Buy Artsays section created successfully!"
    });
  } catch (error) {
    console.error("Error creating Why Buy Artsays section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createWhyBuyArtsays;
