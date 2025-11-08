// // const ArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// // const createGallery = async (req, res) => {
// //   try {
// //     const { title, description, status } = req.body;

// //     if (!title || !description) {
// //       return res.status(400).json({
// //         hasError: true,
// //         message: "Title and description are required.",
// //       });
// //     }

// //     const newGallery = new ArtsaysGallery({
// //       title: title.trim(),
// //       description: description.trim(),
// //       status: status?.trim() || "draft",
// //     });

// //     await newGallery.save();

// //     res.status(201).json({
// //       hasError: false,
// //       message: "Gallery created successfully",
// //       data: newGallery,
// //     });
// //   } catch (error) {
// //     console.error("Error creating gallery:", error);
// //     res.status(500).json({ hasError: true, message: error.message });
// //   }
// // };

// // module.exports = createGallery;








// const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const createCMSArtsaysGallery = async (req, res) => {
//   try {
//     const { title, description, status } = req.body;
//     console.log("CREATE - Received status:", status, "Type:", typeof status);
//     console.log("CREATE - Status comparison (status === 'published'):", status === "published");

//     const currentEntries = await CMSArtsaysGallery.find({}, { status: 1, title: 1 });
//     console.log("CREATE - Current entries in DB:", currentEntries);

//     if (!title || !description) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Title, description, sectionTitle, and sectionDescription are required.",
//       });
//     }

//     // ----- Only one published page at a time -----
//     if (status === "published") {
//       console.log("Setting other published entries to draft...");
//       const result = await CMSArtsaysGallery.updateMany(
//         { status: "published" },
//         { $set: { status: "draft" } }
//       );
//       console.log("Updated entries to draft:", result);
//     }

//     const newEntry = new CMSArtsaysGallery({
//       title: title.trim(),
//       description: description.trim(),
//       sectionTitle: sectionTitle.trim(),
//       sectionDescription: sectionDescription.trim(),
//       userId: req.user?.id || req.body.userId,
//       status: status || "draft",
//     });

//     console.log("CREATE - Final status will be:", newEntry.status);

//     await newEntry.save();

//     res.status(201).json({
//       hasError: false,
//       message: "Gallery entry created successfully!",
//       data: newEntry,
//     });

//     console.log("CMS ARTSAYS GALLERY CREATED:", newEntry);
//   } catch (error) {
//     console.error("Error creating CMS Artsays Gallery:", error);
//     res.status(500).json({
//       hasError: true,
//       message: error.message,
//     });
//   }
// };

// module.exports = createCMSArtsaysGallery;








const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const createCMSArtsaysGallery = async (req, res) => {
  try {
    const { title, description, sectionTitle, sectionDescription, status } = req.body;
    console.log("CREATE - Received status:", status, "Type:", typeof status);
    console.log("CREATE - Status comparison (status === 'published'):", status === "published");

    const currentEntries = await CMSArtsaysGallery.find({}, { status: 1, title: 1 });
    console.log("CREATE - Current entries in DB:", currentEntries);

    if (!title || !description || !sectionTitle || !sectionDescription) {
      return res.status(400).json({
        hasError: true,
        message: "Title, description, sectionTitle, and sectionDescription are required.",
      });
    }

    // ----- Only one published page at a time -----
    if (status === "published") {
      console.log("Setting other published entries to draft...");
      const result = await CMSArtsaysGallery.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
      console.log("Updated entries to draft:", result);
    }

    const newEntry = new CMSArtsaysGallery({
      title: title.trim(),
      description: description.trim(),
      sectionTitle: sectionTitle.trim(),
      sectionDescription: sectionDescription.trim(),
      userId: req.user?.id || req.body.userId, 
      status: status || "draft",
    });

    console.log("CREATE - Final status will be:", newEntry.status);

    await newEntry.save();

    res.status(201).json({
      hasError: false,
      message: "Gallery entry created successfully!",
      data: newEntry,
    });

    console.log("CMS ARTSAYS GALLERY CREATED:", newEntry);
  } catch (error) {
    console.error("Error creating CMS Artsays Gallery:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = createCMSArtsaysGallery;





