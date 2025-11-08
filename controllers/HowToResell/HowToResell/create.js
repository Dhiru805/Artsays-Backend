const HowToResell = require("../../../Models/HowToResell");
const path = require("path");

const createPage = async (req, res) => {
  try {
    const { webpageHeading, webpageDescription, status } = req.body;

    let articles = [];
    const articlesFromClient = req.body.articles;
    const files = req.files || [];

    const parsedArticles =
      typeof articlesFromClient === "string"
        ? JSON.parse(articlesFromClient)
        : articlesFromClient;

    articles = parsedArticles.map((a, idx) => {
      const file = files.find(
        (f) => f.fieldname === `articles[${idx}][bannerImage]`
      );
      return {
        articleHeading: a.articleHeading,
        articleContent: a.articleContent,
        bannerImage: file
          ? path.join("uploads", "howToResell", file.filename)
          : null, 
      };
    });

    if (status === "published") {
      await HowToResell.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    const page = new HowToResell({
      webpageHeading,
      webpageDescription,
      articles,
      status: status || "draft",
    });

    await page.save();

    res.status(201).json({ success: true, data: page });
    console.log("RESALE PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating resell page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createPage;

