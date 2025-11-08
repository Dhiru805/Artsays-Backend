
const DeliveryProcess = require("../../../../Models/aboutUs/sections/DeliveryProcess");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");

const updateDeliveryProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, mainHeading, mainDescription, cards, status } = req.body;

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });
    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!mainHeading || !mainDescription) return res.status(400).json({ success: false, message: "Main Heading & Description are required" });

    let parsedCards = cards ? (typeof cards === "string" ? JSON.parse(cards) : cards) : [];
    if (!Array.isArray(parsedCards)) parsedCards = [];

    parsedCards.forEach((c, idx) => {
      if (!c.heading || !c.description) {
        throw new Error(`Card ${idx + 1} requires heading & description`);
      }
    });

    let section = null;
    
    if (id && id !== 'current') {
      section = await DeliveryProcess.findById(id);
      if (!section) {
        return res.status(404).json({ success: false, message: "Delivery Process document not found" });
      }
    } else {
      section = await DeliveryProcess.findOne({ aboutUsId });
      if (!section) {
        return res.status(404).json({ success: false, message: "Delivery Process section not found for this About Us page" });
      }
    }

    if (status === "published") {
      await DeliveryProcess.updateMany(
        { _id: { $ne: section._id }, status: "published" },
        { status: "draft" }
      );
    }

   
    section.heading = mainHeading.trim();
    section.description = mainDescription.trim();
    section.steps = parsedCards.map((c) => ({
      stepTitle: c.heading.trim(),
      stepDescription: c.description.trim(),
      stepImage: c.stepImage || undefined,
    }));
    
    if (status) {
      section.status = status;
    }

    await section.save();

    res.status(200).json({ 
      success: true, 
      data: section, 
      message: "Delivery Process updated successfully!" 
    });
  } catch (error) {
    console.error("Error updating Delivery Process:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateDeliveryProcess;
