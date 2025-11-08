const Affiliate = require("../../../Models/affiliate");

const getPublishedPage = async (req, res) => {
  try {
    // Find the latest page with status 'published'
    const page = await Affiliate.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({ success: false, message: "No published page found" });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Affiliate published page:", error);
    res.status(500).json({ success: false, message: "Error fetching published page" });
  }
};

module.exports = getPublishedPage;
