
const MissionVision = require("../../../../Models/aboutUs/sections/MissionVision");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");
const createMissionVision = async (req, res) => {
  try {
    const { aboutUsId } = req.body;
    const files = req.files || [];

    if (!aboutUsId) {
      return res.status(400).json({ success: false, message: "aboutUsId is required" });
    }

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) {
      return res.status(404).json({ success: false, message: "About Us page not found" });
    }

    const cardsFromClient =
      typeof req.body.cards === "string" ? JSON.parse(req.body.cards) : req.body.cards || [];

    if (!cardsFromClient.length) {
      return res.status(400).json({ success: false, message: "At least one card is required" });
    }

    const cards = cardsFromClient.map((c, idx) => {
      const iconFile = files.find((f) => f.fieldname === `cards[${idx}][icon]`);
      const sideFile = files.find((f) => f.fieldname === `cards[${idx}][sideImage]`);

      if (!c.heading || !c.description || !iconFile || !sideFile) {
        throw new Error(
          `Card ${idx + 1} requires heading, description, icon, and side image`
        );
      }

      return {
        heading: c.heading.trim(),
        description: c.description.trim(),
      icon: path.join("uploads", "AboutUs", iconFile.filename).replace(/\\/g, "/"),
        sideImage: path.join("uploads", "AboutUs", sideFile.filename).replace(/\\/g, "/"),
      };
    });

    const missionVisionDoc = new MissionVision({
      aboutUsId,
      cards,
    });

    await missionVisionDoc.save();

    aboutUsPage.missionVision = missionVisionDoc._id;
    await aboutUsPage.save();

    res.status(201).json({
      success: true,
      data: missionVisionDoc,
      message: "Mission & Vision cards created successfully!",
    });
  } catch (error) {
    console.error("Error creating Mission & Vision cards:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createMissionVision;




