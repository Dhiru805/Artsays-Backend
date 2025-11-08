const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

const getArtsaysGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await ArtsaysGallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        hasError: true,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      hasError: false,
      data: gallery,
    });
  } catch (error) {
    console.error("Error fetching gallery by ID:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = getArtsaysGalleryById;
