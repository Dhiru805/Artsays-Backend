// const ArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const getGalleryById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const gallery = await ArtsaysGallery.findById(id);
//     if (!gallery) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Gallery not found",
//       });
//     }

//     res.status(200).json({ hasError: false, data: gallery });
//   } catch (error) {
//     console.error("Error fetching gallery:", error);
//     res.status(500).json({ hasError: true, message: error.message });
//   }
// };

// module.exports = getGalleryById;


const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const getCMSArtsaysGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await CMSArtsaysGallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        hasError: true,
        message: "Gallery entry not found.",
      });
    }

    res.status(200).json({
      hasError: false,
      data: gallery,
    });
  } catch (error) {
    console.error("Error fetching CMS Artsays Gallery by ID:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = getCMSArtsaysGalleryById;







