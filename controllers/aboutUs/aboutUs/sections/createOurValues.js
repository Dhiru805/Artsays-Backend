
const OurValues = require("../../../../Models/aboutUs/sections/OurValues");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");

const createOurValues = async (req, res) => {
  try {
    const { aboutUsId, heading, description } = req.body; 
    const files = req.files || [];

    if (!aboutUsId) {
      return res.status(400).json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res.status(404).json({ success: false, message: "About Us page not found" });
    }

    if (!heading || !description) {
      return res.status(400).json({ success: false, message: "Heading and Description are required" });
    }

    
    const cardsFromClient = req.body.cards;
    const parsedCards =
      typeof cardsFromClient === "string" ? JSON.parse(cardsFromClient) : cardsFromClient || [];

    if (!parsedCards.length) {
      return res.status(400).json({ success: false, message: "At least one card is required" });
    }

    
    const cards = parsedCards.map((c, idx) => {
      const cardFile = files.find((f) => f.fieldname === `cards[${idx}][cardImage]`);

      if (!c.cardTitle || !cardFile) {
        throw new Error(`Both title and image are required for card at index ${idx}`);
      }

      return {
        cardTitle: c.cardTitle,
        cardImage: path.join("uploads", "AboutUs", cardFile.filename),
      };
    });

    const ourValuesDoc = new OurValues({
      aboutUsId,
      heading: heading.trim(),
      description: description.trim(),
      cards,
    });

    await ourValuesDoc.save();

    
    aboutUsPage.ourValues = ourValuesDoc._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: ourValuesDoc,
      message: "Our Values section created and linked successfully!",
    });
  } catch (error) {
    console.error("Error creating Our Values:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createOurValues;







