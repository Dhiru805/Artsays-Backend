const AffiliateBP = require("../../../Models/affiliatebp");
const path = require("path");

const updatePageBP = async (req, res) => {
  try {
    const { id } = req.params;
    const { webpageHeading, webpageDescription, status, cardsHeading, cardsDescription  } = req.body;

    const page = await AffiliateBP.findById(id);
    if (!page) return res.status(404).json({ success: false, message: "BP Page not found" });

    const files = req.files || [];

    // ----- Handle Articles -----
    let articles = [];
    try {
      const articlesFromClient = req.body.articles;
      const parsedArticles =
        typeof articlesFromClient === "string"
          ? JSON.parse(articlesFromClient)
          : articlesFromClient || [];

      articles = parsedArticles.map((a, idx) => {
        const file = files.find((f) => f.fieldname === `articles[${idx}][bannerImage]`);
        return {
          articleHeading: a.articleHeading,
          articleContent: a.articleContent,
          bannerImage: file
            ? path.join("uploads", "affiliateBP", file.filename)
            : a.existingBanner || null,
        };
      });
    } catch (err) {
      console.error("Failed to parse BP articles:", err);
      articles = page.articles || [];
    }

    // ----- Handle Cards -----
    let cards = [];
    try {
      const cardsFromClient = req.body.cards;
      const parsedCards =
        typeof cardsFromClient === "string"
          ? JSON.parse(cardsFromClient)
          : cardsFromClient || [];

      cards = parsedCards
        .map((c, idx) => {
          if (!c.cardTitle && !c.existingCardImage) return null;

          const file = files.find((f) => f.fieldname === `cards[${idx}][cardImage]`);

          if (!c.cardTitle || (!c.existingCardImage && !file)) {
            throw new Error(`Both title and image are required for BP card at index ${idx}`);
          }

          return {
            cardTitle: c.cardTitle,
            cardImage: file
              ? path.join("uploads", "affiliateBP", file.filename)
              : c.existingCardImage || null,
          };
        })
        .filter(Boolean);
    } catch (err) {
      console.error("Failed to parse BP cards:", err);
      cards = page.cards || [];
    }

    // Preserve old data if none sent
    if (articles.length === 0) articles = page.articles || [];
    if (cards.length === 0) cards = page.cards || [];

    // ----- Update published status -----
    if (status === "published") {
      await AffiliateBP.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    // ----- Update page -----
    page.webpageHeading = webpageHeading || page.webpageHeading;
    page.webpageDescription = webpageDescription || page.webpageDescription;
    page.status = status || page.status;
    page.cardsHeading = cardsHeading || page.cardsHeading;
    page.cardsDescription = cardsDescription || page.cardsDescription;
    page.articles = articles;
    page.cards = cards;

    await page.save();

    res.status(200).json({ success: true, data: page });
    console.log("AFFILIATE BP PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Affiliate BP page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePageBP;


