const Homepage = require("../../../../Models/homePage/Homepage");
const HeroSection = require("../../../../Models/homePage/sections/hero");
const path = require("path");

const createHeroSection = async (req, res) => {
  try {
    const { homepageId, title, description, recurrentTitles, buttons } = req.body;
    const files = req.files || [];

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and Description are required" });
    }

    let parsedTitles = recurrentTitles ? (typeof recurrentTitles === "string" ? JSON.parse(recurrentTitles) : recurrentTitles) : [];
    let parsedButtons = buttons ? (typeof buttons === "string" ? JSON.parse(buttons) : buttons) : [];

    parsedTitles = parsedTitles.map((t, idx) => {
      const file = files.find(f => f.fieldname === `recurrentTitles[${idx}][image]`);
      if (file) t.image = path.join("uploads", "homePage", file.filename);
      return t;
    });

    for (let i = 0; i < parsedTitles.length; i++) {
      const t = parsedTitles[i];
      if (!t.title || !t.image || !t.duration) {
        return res.status(400).json({ success: false, message: `Recurrent title ${i + 1} requires title, image, and duration` });
      }
    }

    for (let i = 0; i < parsedButtons.length; i++) {
      const b = parsedButtons[i];
      if (!b.name || !b.link) {
        return res.status(400).json({ success: false, message: `Button ${i + 1} requires name and link` });
      }
    }

    const newSection = new HeroSection({
      homepageId,
      title,
      description,
      recurrentTitles: parsedTitles,
      buttons: parsedButtons,
    });

    await newSection.save();

    homepage.heroSection = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "Hero Section created successfully!" });
  } catch (error) {
    console.error("Error creating Hero Section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createHeroSection;
