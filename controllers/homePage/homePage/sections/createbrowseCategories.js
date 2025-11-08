const Homepage = require("../../../../Models/homePage/Homepage");
const BrowseCategories = require("../../../../Models/homePage/sections/browseCategories");
const path = require("path");

const createBrowseCategories = async (req, res) => {
  try {
    const { homepageId, heading, description, buttonName, buttonLink, tags } = req.body;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !description || !buttonName || !buttonLink) {
      return res.status(400).json({ success: false, message: "Heading, Description, Button Name, and Button Link are required" });
    }

    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      parsedTags = parsedTags.map((t, i) => {
        if (!t.title) {
          throw new Error(`Tag ${i + 1} requires title`);
        }
        return t;
      });
    }

    const files = req.files || [];
    parsedTags = parsedTags.map((t, i) => {
      const f = files.find(x => x.fieldname === `tags[${i}][icon]`);
      if (f) {
        t.icon = path.join("uploads", "homePage", f.filename);
      }
      return t;
    });

    const newSection = new BrowseCategories({
      homepageId,
      heading,
      description,
      buttonName,
      buttonLink,
      tags: parsedTags,
    });

    await newSection.save();

    homepage.browseCategories = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "Browse Categories section created successfully!" });
  } catch (error) {
    console.error("Error creating Browse Categories section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createBrowseCategories;
