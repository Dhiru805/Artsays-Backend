const AffiliateBP = require("../../../Models/affiliatebp");

const getPublishedPageBP = async (req, res) => {
  try {
    // Find the latest page with status 'published'
    const page = await AffiliateBP.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({ success: false, message: "No published BP page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Affiliate BP published page:", error);
    res.status(500).json({ success: false, message: "Error fetching published BP page" });
  }
};

module.exports = getPublishedPageBP;
