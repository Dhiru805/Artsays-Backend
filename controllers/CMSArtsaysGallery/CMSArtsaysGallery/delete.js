// const ArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const deleteGallery = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const gallery = await ArtsaysGallery.findByIdAndDelete(id);
//     if (!gallery) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Gallery not found",
//       });
//     }

//     res.status(200).json({
//       hasError: false,
//       message: "Gallery deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting gallery:", error);
//     res.status(500).json({ hasError: true, message: error.message });
//   }
// };

// module.exports = deleteGallery;


const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const deleteCMSArtsaysGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CMSArtsaysGallery.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        hasError: true,
        message: "Gallery entry not found.",
      });
    }

    res.status(200).json({
      hasError: false,
      message: "Gallery entry deleted successfully!",
    });

    console.log("CMS ARTSAYS GALLERY DELETED:", deleted);
  } catch (error) {
    console.error("Error deleting CMS Artsays Gallery:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = deleteCMSArtsaysGallery;
