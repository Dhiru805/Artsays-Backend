// const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

// const updateArtsaysGallery = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let { type, userId, userName, curator } = req.body;

//     type = type?.trim();
//     userName = userName?.trim();
//     curator = curator?.trim();

//     if (!type || !userId || !userName || !curator) {
//       return res.status(400).json({
//         success: false,
//         message: "Type, userId, userName, and curator are all required.",
//       });
//     }

//     if (!["Artist", "Seller"].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: "Type must be either 'Artist' or 'Seller'.",
//       });
//     }

//     const gallery = await ArtsaysGallery.findById(id);
//     if (!gallery) {
//       return res.status(404).json({ success: false, message: "Gallery not found" });
//     }

//     gallery.type = type;
//     gallery.userId = userId;
//     gallery.userName = userName;
//     gallery.curator = curator;

//     await gallery.save();

//     res.status(200).json({ success: true, message: "Gallery updated successfully", data: gallery });
//     console.log("ARTSAYS GALLERY UPDATED:", gallery);
//   } catch (error) {
//     console.error("Error updating Artsays Gallery:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = updateArtsaysGallery;



const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

const updateArtsaysGallery = async (req, res) => {
  try {
    const { id } = req.params;
    let { type, userId, userName, curator } = req.body;

    type = type?.trim();
    userName = userName?.trim();
    curator = curator?.trim();

    if (!type || !userId || !userName || !curator) {
      return res.status(400).json({
        hasError: true,   
        message: "Type, userId, userName, and curator are all required.",
      });
    }

    if (!["Artist", "Seller"].includes(type)) {
      return res.status(400).json({
        hasError: true, 
        message: "Type must be either 'Artist' or 'Seller'.",
      });
    }

    const gallery = await ArtsaysGallery.findById(id);
    if (!gallery) {
      return res.status(404).json({
        hasError: true,  
        message: "Gallery not found",
      });
    }

    gallery.type = type;
    gallery.userId = userId;
    gallery.userName = userName;
    gallery.curator = curator;

    await gallery.save();

    res.status(200).json({
      hasError: false,  
      message: "Gallery updated successfully",
      data: gallery,
    });

    console.log("ARTSAYS GALLERY UPDATED:", gallery);
  } catch (error) {
    console.error("Error updating Artsays Gallery:", error);
    res.status(500).json({
      hasError: true,   
      message: error.message,
    });
  }
};

module.exports = updateArtsaysGallery;
