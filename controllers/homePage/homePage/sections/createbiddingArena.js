const Homepage = require("../../../../Models/homePage/Homepage");
const BiddingArena = require("../../../../Models/homePage/sections/biddingArena");

const createBiddingArena = async (req, res) => {
  try {
    const { homepageId, heading, description, buttonName, buttonLink } = req.body;

    if (!homepageId) {
      return res.status(400).json({ success: false, message: "homepageId is required" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (!heading || !buttonName || !buttonLink) {
      return res.status(400).json({ success: false, message: "Heading, Button Name & Button Link are required" });
    }

    const newSection = new BiddingArena({
      homepageId,
      heading,
      description: description || "",
      buttonName,
      buttonLink,
    });

    await newSection.save();

   
    homepage.biddingArena = newSection._id;
    await homepage.save();

    res.status(201).json({ success: true, data: newSection, message: "Bidding Arena section created successfully!" });
  } catch (error) {
    console.error("Error creating Bidding Arena section:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createBiddingArena;
