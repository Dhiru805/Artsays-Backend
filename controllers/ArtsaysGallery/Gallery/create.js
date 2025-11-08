
// const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

// const createArtsaysGallery = async (req, res) => {
//   try {
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
//     const newGallery = new ArtsaysGallery({
//       type,
//       userId,
//       userName,
//       curator,
//     });

//     await newGallery.save();

//     res.status(201).json({
//       success: true,
//       message: "Gallery entry created successfully.",
//       data: newGallery,
//     });

//     console.log("ARTSAYS GALLERY ENTRY CREATED:", newGallery);
//   } catch (error) {
//     console.error("Error creating gallery entry:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = createArtsaysGallery;


const ArtsaysGallery = require("../../../Models/ArtsaysGallery");

const createArtsaysGallery = async (req, res) => {
  try {
    const { type, userId, userName, curator } = req.body;

    if (!curator) {
      return res.status(400).json({
        hasError: true,
        message: "Curator name is required.",
      });
    }
    if (!type || !userId || !userName) {
      return res.status(400).json({
        hasError: true,
        message: "Type, userId, and userName are required.",
      });
    }
    const newGallery = new ArtsaysGallery({
      type,
      userId,
      userName,
      curator,
    });

    await newGallery.save();

    res.status(201).json({
      hasError: false,        
      message: "Curation created successfully!",
      data: newGallery,
    });

    console.log("ARTSAYS GALLERY ENTRY CREATED:", newGallery);
  } catch (error) {
    console.error("Error creating gallery entry:", error);
    res.status(500).json({
      hasError: true,        
      message: error.message,
    });
  }
};

module.exports = createArtsaysGallery;
