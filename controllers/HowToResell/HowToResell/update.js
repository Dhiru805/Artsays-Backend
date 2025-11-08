const HowToResell = require("../../../Models/HowToResell");
const path = require("path");

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { webpageHeading, webpageDescription, status } = req.body;

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
            ? path.join("uploads", "howToResell", file.filename)
            : a.existingBanner || null,
        };
      });
    } catch (err) {
      console.error("Failed to parse articles:", err);
      articles = [];
    }

   
    if (status === "published") {
      await HowToResell.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    const updated = await HowToResell.findByIdAndUpdate(
      id,
      { webpageHeading, webpageDescription, articles, status: status || "draft" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "How To Resell page not found" });
    }

    res.status(201).json({ success: true, data: updated });
    console.log("How To Resell PAGE UPDATED:", updated);
  } catch (error) {
    console.error("Error updating HowToResell page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePage;


