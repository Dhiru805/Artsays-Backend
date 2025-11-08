const HowToBuy = require("../../../Models/HowToBuy");

const getPages = async (req, res) => {
  try {
    const pages = await HowToBuy.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getPages;
