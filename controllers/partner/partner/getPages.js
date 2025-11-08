const PartnerPage = require("../../../Models/Partner");

const getPartnerPages = async (req, res) => {
  try {
    const pages = await PartnerPage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching Partner pages:", error);
    res.status(500).json({ success: false, message: "Error fetching pages" });
  }
};

module.exports = getPartnerPages;
