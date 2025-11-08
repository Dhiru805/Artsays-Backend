// const ArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const getGalleries = async (req, res) => {
//   try {
//     const galleries = await ArtsaysGallery.find().sort({ createdAt: -1 });
//     res.status(200).json({ hasError: false, data: galleries });
//   } catch (error) {
//     console.error("Error fetching galleries:", error);
//     res.status(500).json({ hasError: true, message: error.message });
//   }
// };

// module.exports = getGalleries;


const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const getCMSArtsaysGallery = async (req, res) => {
  try {
    const galleries = await CMSArtsaysGallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      hasError: false,
      data: galleries,
    });
  } catch (error) {
    console.error("Error fetching CMS Artsays Gallery entries:", error);
    res.status(500).json({
      hasError: true,
      message: "Error fetching gallery entries.",
    });
  }
};

module.exports = getCMSArtsaysGallery;
