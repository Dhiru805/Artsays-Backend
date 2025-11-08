// const CMSArtsaysGallery = require("../../../Models/ArtsaysGallery");
// const User = require("../../../Models/usermode");

// exports.getSuccessPartners = async (req, res) => {
//   try {
//     const galleries = await CMSArtsaysGallery.find({ status: "published" });

//     if (!galleries || galleries.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No published galleries found",
//       });
//     }
//     const results = [];

//     for (const gallery of galleries) {
//       const userId = gallery.userId;

//       if (!userId) continue;

//       const user = await User.findById(userId)
//         .select("name lastName profilePhoto _id")
//         .lean();

//       if (user) {
//         results.push({
//           galleryId: gallery._id,
//           title: gallery.title,
//           description: gallery.description,
//           sectionTitle: gallery.sectionTitle,
//           sectionDescription: gallery.sectionDescription,
//           userId: user._id,
//           userName: `${user.name} ${user.lastName}`.trim(),
//           profilePhoto: user.profilePhoto || null,
//         });
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Fetched success partners successfully",
//       data: results,
//     });
//   } catch (error) {
//     console.error("Error fetching success partners:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching success partners",
//       error: error.message,
//     });
//   }
// };




// const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");
// const User = require("../../../Models/usermode");

// const getSuccessPartners = async (req, res) => {
//   try {
//     const galleries = await CMSArtsaysGallery.find({ status: "published" }).sort({ createdAt: -1 });

//     if (!galleries || galleries.length === 0) {
//       return res.status(404).json({
//         hasError: true,
//         message: "No published galleries found.",
//       });
//     }

//     const results = [];

//     for (const gallery of galleries) {
//       if (!gallery.userId) continue;

//       const user = await User.findById(gallery.userId)
//         .select("name lastName profilePhoto _id userType")
//         .lean();

//       if (user) {
//         results.push({
//           galleryId: gallery._id,
//           title: gallery.title,
//           description: gallery.description,
//           sectionTitle: gallery.sectionTitle,
//           sectionDescription: gallery.sectionDescription,
//           userId: user._id,
//           userName: `${user.name} ${user.lastName}`.trim(),
//           profilePhoto: user.profilePhoto || null,
//           userType: user.userType,
//         });
//       }
//     }

//     res.status(200).json({
//       hasError: false,
//       message: "Fetched success partners successfully.",
//       partners: results,
//     });
//   } catch (error) {
//     console.error("Error fetching success partners:", error);
//     res.status(500).json({
//       hasError: true,
//       message: "Server error while fetching success partners.",
//     });
//   }
// };

// module.exports = getSuccessPartners;



// const ArtsaysGallery = require("../../../Models/ArtsaysGallery");
// const User = require("../../../Models/usermode");

// exports.getSuccessPartners = async (req, res) => {
//   try {
//     const galleries = await ArtsaysGallery.find({ status: "published" });

//     if (!galleries || galleries.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No published galleries found",
//       });
//     }

//     const userIds = galleries.map((gallery) => gallery.userId);

//     const users = await User.find({ _id: { $in: userIds } }).select(
//       "_id profilePhoto name lastName userType"
//     );

//     const result = galleries.map((gallery) => {
//       const matchedUser = users.find(
//         (user) => user._id.toString() === gallery.userId.toString()
//       );

//       return {
//         galleryId: gallery._id,
//         userId: gallery.userId,
//         userName: gallery.userName,
//         type: gallery.type,
//         curator: gallery.curator,
//         profilePhoto: matchedUser?.profilePhoto || null,
//       };
//     });

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error fetching success partners:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };


const ArtsaysGallery = require("../../../Models/ArtsaysGallery");
const User = require("../../../Models/usermode");

const getSuccessPartners = async (req, res) => {
  try {
    console.log("FETCHING SUCCESS PARTNERS...");

    const galleries = await ArtsaysGallery.find();

    if (!galleries || galleries.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No published galleries found.",
      });
    }

    console.log(`Found ${galleries.length} published galleries.`);

    const userIds = galleries.map((gallery) => gallery.userId);
    console.log("Extracted User IDs:", userIds);

    const users = await User.find({ _id: { $in: userIds } }).select(
      "_id profilePhoto name lastName userType"
    );

    console.log(`Fetched ${users.length} matching user records.`);

    const result = galleries.map((gallery) => {
      const matchedUser = users.find(
        (user) => user._id.toString() === gallery.userId.toString()
      );

      return {
        galleryId: gallery._id,
        userId: gallery.userId,
        userName: gallery.userName,
        type: gallery.type,
        curator: gallery.curator,
        profilePhoto: matchedUser?.profilePhoto || null,
      };
    });

    res.status(200).json({
      hasError: false,
      message: "Success partners fetched successfully!",
      data: result,
    });

    console.log("SUCCESS PARTNERS FETCHED:", result.length);
  } catch (error) {
    console.error("Error fetching success partners:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = getSuccessPartners;
