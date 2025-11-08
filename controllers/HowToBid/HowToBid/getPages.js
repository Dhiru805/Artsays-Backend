const HowToBid = require("../../../Models/howToBid");

const getPages = async (req, res) => {
  try {
    const pages = await HowToBid.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching HowToBid pages:", error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getPages;
