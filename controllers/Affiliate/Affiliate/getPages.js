const Affiliate = require("../../../Models/affiliate");

const getPages = async (req, res) => {
  try {
    const pages = await Affiliate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching Affiliate pages:", error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getPages;
