// const ArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const updateGallery = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, status } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Title and description are required.",
//       });
//     }

//     const gallery = await ArtsaysGallery.findById(id);
//     if (!gallery) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Gallery not found",
//       });
//     }

//     gallery.title = title.trim();
//     gallery.description = description.trim();
//     gallery.status = status?.trim() || "draft";

//     await gallery.save();

//     res.status(200).json({
//       hasError: false,
//       message: "Gallery updated successfully",
//       data: gallery,
//     });
//   } catch (error) {
//     console.error("Error updating gallery:", error);
//     res.status(500).json({ hasError: true, message: error.message });
//   }
// };

// module.exports = updateGallery;


// const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const updateCMSArtsaysGallery = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, status } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Title and description are required.",
//       });
//     }

//     const entry = await CMSArtsaysGallery.findById(id);
//     if (!entry) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Gallery entry not found.",
//       });
//     }

//     entry.title = title.trim();
//     entry.description = description.trim();
//     entry.status = status || entry.status;

//     await entry.save();

//     res.status(200).json({
//       hasError: false,
//       message: "Gallery entry updated successfully!",
//       data: entry,
//     });

//     console.log("CMS ARTSAYS GALLERY UPDATED:", entry);
//   } catch (error) {
//     console.error("Error updating CMS Artsays Gallery:", error);
//     res.status(500).json({
//       hasError: true,
//       message: error.message,
//     });
//   }
// };

// module.exports = updateCMSArtsaysGallery;







// const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

// const updateCMSArtsaysGallery = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, status } = req.body;
//     console.log("UPDATE - Received status:", status, "Type:", typeof status);
//     console.log("UPDATE - Status comparison (status === 'published'):", status === "published");

//     if (!title || !description) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Title and description are required.",
//       });
//     }

//     const entry = await CMSArtsaysGallery.findById(id);
//     if (!entry) {
//       return res.status(404).json({
//         hasError: true,
//         message: "Gallery entry not found.",
//       });
//     }

//     console.log("UPDATE - Current entry status:", entry.status);

//     const currentEntries = await CMSArtsaysGallery.find({}, { status: 1, title: 1 });
//     console.log("UPDATE - Current entries in DB:", currentEntries);

//     entry.title = title.trim();
//     entry.description = description.trim();

//     if (status === "published") {
//       console.log("Setting other published entries to draft for update...");
//       const result = await CMSArtsaysGallery.updateMany(
//         { status: "published", _id: { $ne: id } },
//         { $set: { status: "draft" } }
//       );
//       console.log("Updated entries to draft:", result);
//     }

//     entry.status = status || entry.status;
//     console.log("UPDATE - Final status will be:", entry.status);

//     await entry.save();

//     res.status(200).json({
//       hasError: false,
//       message: "Gallery entry updated successfully!",
//       data: entry,
//     });

//     console.log("CMS ARTSAYS GALLERY UPDATED:", entry);
//   } catch (error) {
//     console.error("Error updating CMS Artsays Gallery:", error);
//     res.status(500).json({
//       hasError: true,
//       message: error.message,
//     });
//   }
// };

// module.exports = updateCMSArtsaysGallery;




const CMSArtsaysGallery = require("../../../Models/CMSArtsaysGallery");

const updateCMSArtsaysGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, sectionTitle, sectionDescription, status } = req.body;
    console.log("UPDATE - Received status:", status, "Type:", typeof status);
    console.log("UPDATE - Status comparison (status === 'published'):", status === "published");

    if (!title || !description || !sectionTitle || !sectionDescription) {
      return res.status(400).json({
        hasError: true,
        message: "Title, description, sectionTitle, and sectionDescription are required.",
      });
    }

    const entry = await CMSArtsaysGallery.findById(id);
    if (!entry) {
      return res.status(404).json({
        hasError: true,
        message: "Gallery entry not found.",
      });
    }

    console.log("UPDATE - Current entry status:", entry.status);

    const currentEntries = await CMSArtsaysGallery.find({}, { status: 1, title: 1 });
    console.log("UPDATE - Current entries in DB:", currentEntries);

    entry.title = title.trim();
    entry.description = description.trim();
    entry.sectionTitle = sectionTitle.trim();
    entry.sectionDescription = sectionDescription.trim();

    if (status === "published") {
      console.log("Setting other published entries to draft for update...");
      const result = await CMSArtsaysGallery.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
      console.log("Updated entries to draft:", result);
    }

    entry.status = status || entry.status;
    console.log("UPDATE - Final status will be:", entry.status);

    await entry.save();

    res.status(200).json({
      hasError: false,
      message: "Gallery entry updated successfully!",
      data: entry,
    });

    console.log("CMS ARTSAYS GALLERY UPDATED:", entry);
  } catch (error) {
    console.error("Error updating CMS Artsays Gallery:", error);
    res.status(500).json({
      hasError: true,
      message: error.message,
    });
  }
};

module.exports = updateCMSArtsaysGallery;
