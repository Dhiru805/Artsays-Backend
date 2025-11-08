const PartnerPage = require("../../../Models/Partner");

const getPublishedPartnerPage = async (req, res) => {
  try {
    const page = await PartnerPage.findOne({ status: "published" }).sort({
      createdAt: -1,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "No published partner page found",
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching Partner published page:", error);
    res.status(500).json({ success: false, message: "Error fetching page" });
  }
};

module.exports = getPublishedPartnerPage;
