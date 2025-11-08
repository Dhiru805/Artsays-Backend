const Homepage = require("../../../../Models/homePage/Homepage");
const ArtIcon = require("../../../../Models/homePage/sections/artIcon");

const createArtIcon = async (req, res) => {
  try {
    const { homepageId, heading, description, buttonName, buttonLink } = req.body;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !description || !buttonName || !buttonLink) {
      return res.status(400).json({ success: false, message: "Heading, Description, Button Name & Button Link are required" });
    }

    const newSection = new ArtIcon({
      homepageId,
      heading,
      description,
      buttonName,
      buttonLink,
    });

    await newSection.save();

  
    homepage.artIcon = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "Art Icon section created successfully!" });
  } catch (error) {
    console.error("Error creating Art Icon section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createArtIcon;
