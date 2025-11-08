
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const DeliveryProcess = require("../../../../Models/aboutUs/sections/DeliveryProcess");

const createDeliveryProcess = async (req, res) => {
  try {
    const { aboutUsId, mainHeading, mainDescription, cards } = req.body;

    if (!aboutUsId) {
      return res
        .status(400)
        .json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res
        .status(404)
        .json({ success: false, message: "About Us page not found" });
    }

    let parsedCards =
      cards && typeof cards === "string" ? JSON.parse(cards) : cards || [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    if (!mainHeading || !mainDescription) {
      return res.status(400).json({
        success: false,
        message: "Main Heading & Description are required",
      });
    }

    for (let i = 0; i < parsedCards.length; i++) {
      const c = parsedCards[i];
      if (!c.heading || !c.description) {
        return res.status(400).json({
          success: false,
          message: `Card ${i + 1} requires heading & description`,
        });
      }
    }

    const newSection = new DeliveryProcess({
      aboutUsId,
      heading: mainHeading.trim(),
      description: mainDescription.trim(),
      steps: parsedCards.map((c) => ({
        stepTitle: c.heading.trim(),
        stepDescription: c.description.trim(),
        stepImage: c.stepImage || undefined, // optional
      })),
    });

    await newSection.save();

    
    aboutUsPage.deliveryProcess = newSection._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: newSection,
      message: "Delivery Process created successfully!",
    });
  } catch (error) {
    console.error("Error creating Delivery Process:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createDeliveryProcess;









