const AffiliateBP = require("../../../Models/affiliatebp");

const getPagesBP = async (req, res) => {
  try {
    const pages = await AffiliateBP.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching Affiliate BP pages:", error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getPagesBP;
