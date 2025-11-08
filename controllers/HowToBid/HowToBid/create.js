const HowToBid = require("../../../Models/howToBid");
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
          ? path.join("uploads", "howToBid", file.filename)
          : null,
        buttonName: a.buttonName || null,
        buttonPath: a.buttonPath || null,
      };
    });

    if (status === "published") {
      await HowToBid.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    const page = new HowToBid({
      webpageHeading,
      webpageDescription,
      articles,
      status: status || "draft",
    });

    await page.save();

    res.status(201).json({ success: true, data: page });
    console.log("HowToBid PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating HowToBid page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createPage;


