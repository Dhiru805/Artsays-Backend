const Commission = require("../../../Models/commission");
const path = require("path");

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { webpageHeading, webpageDescription, status } = req.body;

    // Handles articles from frontend
    let articles = [];
    try {
      const articlesFromClient = req.body.articles;
      const files = req.files || [];
      const parsedArticles =
        typeof articlesFromClient === "string"
          ? JSON.parse(articlesFromClient)
          : articlesFromClient;

      articles = parsedArticles.map((a, idx) => {
        const file = files.find((f) => f.fieldname === `articles[${idx}][bannerImage]`);
        return {
          articleHeading: a.articleHeading,
          articleContent: a.articleContent,
          bannerImage: file
            ? path.join("uploads", "commission", file.filename)
            : a.existingBanner || null,
          buttonName: a.buttonName || null,
          buttonPath: a.buttonPath || null,
        };
      });
    } catch (err) {
      console.error("Failed to parse articles:", err);
      articles = [];
    }

    
    if (status === "published") {
      await Commission.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    const updated = await Commission.findByIdAndUpdate(
      id,
      { webpageHeading, webpageDescription, articles, status: status || "draft" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.status(201).json({ success: true, data: updated });
    console.log("COMMISSION PAGE UPDATED:", updated);
  } catch (error) {
    console.error("Error updating Commission page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePage;










// const Commission = require("../../../Models/commission");
// const { getFilePath } = require("../../../Middlewares/Multerfile/multerUploads"); // helper

// const updatePage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { webpageHeading, webpageDescription, status } = req.body;
//     const files = req.files || [];

//     // ----- Handle Articles -----
//     let articles = [];
//     const articlesFromClient = req.body.articles;

//     if (articlesFromClient) {
//       const parsedArticles =
//         typeof articlesFromClient === "string"
//           ? JSON.parse(articlesFromClient)
//           : articlesFromClient;

//       articles = parsedArticles.map((a, idx) => {
//         const file = files.find((f) => f.fieldname === `articles[${idx}][bannerImage]`);
//         return {
//           articleHeading: a.articleHeading,
//           articleContent: a.articleContent,
//           bannerImage: file ? getFilePath(file, "commission") : a.existingBanner || null,
//           buttonName: a.buttonName || null,
//           buttonPath: a.buttonPath || null,
//         };
//       });
//     }

//     // ----- Ensure single published page -----
//     if (status === "published") {
//       await Commission.updateMany(
//         { status: "published", _id: { $ne: id } },
//         { $set: { status: "draft" } }
//       );
//     }

//     // ----- Update page -----
//     const updated = await Commission.findByIdAndUpdate(
//       id,
//       {
//         webpageHeading,
//         webpageDescription,
//         articles,
//         status: status || "draft",
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Page not found" });
//     }

//     res.status(200).json({ success: true, data: updated });
//     console.log("COMMISSION PAGE UPDATED:", updated);
//   } catch (error) {
//     console.error("Error updating Commission page:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = updatePage;

