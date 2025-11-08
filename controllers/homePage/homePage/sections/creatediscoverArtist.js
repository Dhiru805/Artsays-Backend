const Homepage = require("../../../../Models/homePage/Homepage");
const DiscoverArtist = require("../../../../Models/homePage/sections/discoverArtist");

const createDiscoverArtist = async (req, res) => {
  try {
    const { homepageId, heading, description } = req.body;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !description) {
      return res.status(400).json({ success: false, message: "Heading and Description are required" });
    }

    const newSection = new DiscoverArtist({
      homepageId,
      heading,
      description,
    });

    await newSection.save();

    homepage.discoverArtist = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "Discover Artist section created successfully!" });
  } catch (error) {
    console.error("Error creating Discover Artist section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createDiscoverArtist;
