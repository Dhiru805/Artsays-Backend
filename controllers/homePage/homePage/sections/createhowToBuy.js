
const Homepage = require("../../../../Models/homePage/Homepage");
const HowToBuy = require("../../../../Models/homePage/sections/howToBuy");
const path = require("path");

const createHowToBuy = async (req, res) => {
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
      return res.status(400).json({ success: false, message: "Heading, buttonName and buttonLink are required" });
    }

   
    let parsedCards = cards ? (typeof cards === "string" ? JSON.parse(cards) : cards) : [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    for (let i = 0; i < parsedCards.length; i++) {
      const c = parsedCards[i];

      if (!c.title || !c.description) {
        return res.status(400).json({ success: false, message: `Card ${i + 1} requires title and description` });
      }

      const file = files.find(f => f.fieldname === `cards[${i}][image]`);
      if (!file) {
        return res.status(400).json({ success: false, message: `Card ${i + 1} image is required` });
      }
      c.image = path.join("uploads", "homePage", file.filename);

      const cardIcons = files.filter(f => f.fieldname.startsWith(`cards[${i}][icons]`));
      c.icons = cardIcons.map(f => path.join("uploads", "homePage", f.filename));
    }

    const newSection = new HowToBuy({
      homepageId,
      heading,
      description: description || "",
      buttonName,
      buttonLink,
      cards: parsedCards,
    });

    await newSection.save();

    homepage.howToBuyHP = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "How To Buy section created successfully!" });
  } catch (error) {
    console.error("Error creating How To Buy section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createHowToBuy;
