const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const getPublishedPage = async (req, res) => {
  try {
    const page = await CMSArtsaysGallery.findOne({ status: "published" }).sort({ createdAt: -1 });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "No published CMS Artsays Gallery page found",
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error("Error fetching CMS Artsays Gallery published page:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching published page",
    });
  }
};

module.exports = getPublishedPage;
