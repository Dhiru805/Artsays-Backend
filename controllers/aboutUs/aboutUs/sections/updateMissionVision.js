

const MissionVision = require("../../../../Models/aboutUs/sections/MissionVision");
const AboutUs = require("../../../../Models/aboutUs/AboutUs");
const path = require("path");
const updateMissionVision = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutUsId, status } = req.body;
    const files = req.files || [];
    const cardsFromClient = typeof req.body.cards === "string" ? JSON.parse(req.body.cards) : req.body.cards || [];

    if (!aboutUsId) return res.status(400).json({ success: false, message: "aboutUsId is required" });

    const aboutUsPage = await AboutUs.findById(aboutUsId);
    if (!aboutUsPage) return res.status(404).json({ success: false, message: "About Us page not found" });

    if (!cardsFromClient.length) return res.status(400).json({ success: false, message: "At least one card is required" });

    let missionVisionDoc = id && id !== "current"
      ? await MissionVision.findById(id)
      : await MissionVision.findOne({ aboutUsId });

    if (!missionVisionDoc) return res.status(404).json({ success: false, message: "Mission & Vision section not found" });

    const updatedCards = cardsFromClient.map((c, idx) => {
      const iconFile = files.find(f => f.fieldname === `cards[${idx}][icon]`);
      const sideFile = files.find(f => f.fieldname === `cards[${idx}][sideImage]`);

      if (!c.heading || !c.description) {
        throw new Error(`Card ${idx + 1} requires heading and description`);
      }

      return {
        heading: c.heading.trim(),
        description: c.description.trim(),
        // icon: iconFile
        //   ? `MissionVision/${iconFile.filename}`.replace(/\\/g, "/")
        //   : (c.icon || missionVisionDoc.cards[idx]?.icon)?.replace(/\\/g, "/"),
        // sideImage: sideFile
        //   ? `MissionVision/${sideFile.filename}`.replace(/\\/g, "/")
        //   : (c.sideImage || missionVisionDoc.cards[idx]?.sideImage)?.replace(/\\/g, "/"),

        icon: path.join("uploads", "AboutUs", iconFile.filename).replace(/\\/g, "/"),
        sideImage: path.join("uploads", "AboutUs", sideFile.filename).replace(/\\/g, "/"),
      };
    });

    missionVisionDoc.cards = updatedCards;
    if (status) missionVisionDoc.status = status;

    await missionVisionDoc.save();

    res.status(200).json({ success: true, data: missionVisionDoc, message: "Mission & Vision cards updated successfully!" });
  } catch (error) {
    console.error("Error updating MissionVision:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateMissionVision;
