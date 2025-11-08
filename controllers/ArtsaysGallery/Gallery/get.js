const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

const getArtsaysGallery = async (req, res) => {
  try {
    const galleries = await ArtsaysGallery.find().sort({ createdAt: -1 });
    //res.json({ success: true, data: galleries });
    res.json({ hasError: false, data: galleries });

  } catch (error) {
    console.error("Error fetching Artsays Gallery entries:", error);
    res.status(500).json({ success: false, message: "Error fetching gallery entries" });
  }
};

module.exports = getArtsaysGallery;
