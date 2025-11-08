
const OurValues = require("../../../../Models/aboutUs/sections/OurValues");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");

const updateOurValues = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, heading, description, status } = req.body;
    const files = req.files || [];

    if (!aboutUsId)
      return res.status(400).json({ success: false, message: "aboutUsId is required" });

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage)
      return res.status(404).json({ success: false, message: "About Us page not found" });

    let ourValuesDoc = null;
    if (id && id !== "current") {
      ourValuesDoc = await OurValues.findById(id);
      if (!ourValuesDoc)
        return res.status(404).json({ success: false, message: "Our Values document not found" });
    } else {
      ourValuesDoc = await OurValues.findOne({ aboutUsId });
      if (!ourValuesDoc)
        return res.status(404).json({ success: false, message: "Our Values section not found for this About Us page" });
    }

    const cardsFromClient = req.body.cards;
    const parsedCards =
      typeof cardsFromClient === "string" ? JSON.parse(cardsFromClient) : cardsFromClient || [];

    if (!parsedCards.length)
      return res.status(400).json({ success: false, message: "At least one card is required" });

    const updatedCards = parsedCards
      .map((c, idx) => {
        if (!c.cardTitle && !c.existingCardImage) return null;

        const cardFile = files.find(f => f.fieldname === `cards[${idx}][cardImage]`);

        if (!c.cardTitle || (!c.existingCardImage && !cardFile)) {
          throw new Error(`Both title and image are required for card at index ${idx}`);
        }

        return {
          cardTitle: c.cardTitle,
          cardImage: cardFile
            ? path.join("uploads", "AboutUs", cardFile.filename)
            : c.existingCardImage || ourValuesDoc.cards[idx]?.cardImage || null,
        };
      })
      .filter(Boolean);

    if (heading) ourValuesDoc.heading = heading.trim();
    if (description) ourValuesDoc.description = description.trim();
    if (status) ourValuesDoc.status = status;
    ourValuesDoc.cards = updatedCards;

    await ourValuesDoc.save();

    res.status(200).json({
      success: true,
      data: ourValuesDoc,
      message: "Our Values section updated successfully!",
    });
  } catch (error) {
    console.error("Error updating Our Values:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateOurValues;
