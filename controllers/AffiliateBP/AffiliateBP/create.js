const AffiliateBP = require("../../../Models/affiliatebp");
const path = require("path");

const createPageBP = async (req, res) => {
  try {
    const { webpageHeading, webpageDescription, status } = req.body;
    const files = req.files || [];

    // ----- Articles -----
    let articles = [];
    const articlesFromClient = req.body.articles;
    const parsedArticles =
      typeof articlesFromClient === "string"
        ? JSON.parse(articlesFromClient)
        : articlesFromClient;

    if (parsedArticles && Array.isArray(parsedArticles)) {
      articles = parsedArticles.map((a, idx) => {
        const file = files.find(
          (f) => f.fieldname === `articles[${idx}][bannerImage]`
        );

        return {
          articleHeading: a.articleHeading,
          articleContent: a.articleContent,
          bannerImage: file
            ? path.join("uploads", "affiliateBP", file.filename)
            : a.existingBanner || null,
          buttonName: a.buttonName || "",
          buttonPath: a.buttonPath || "",
        };
      });
    }

    // ----- Cards -----
    let cards = [];
    const cardsFromClient = req.body.cards;
    if (cardsFromClient) {
      const parsedCards =
        typeof cardsFromClient === "string"
          ? JSON.parse(cardsFromClient)
          : cardsFromClient;

      if (parsedCards && Array.isArray(parsedCards)) {
        cards = parsedCards.map((c, idx) => {
          const file = files.find(
            (f) => f.fieldname === `cards[${idx}][cardImage]`
          );

          return {
            cardTitle: c.cardTitle,
            cardImage: file
              ? path.join("uploads", "affiliateBP", file.filename)
              : c.existingCardImage || null,
            buttonName: c.buttonName || "",
            buttonPath: c.buttonPath || "",
          };
        });

        //  VALIDATION: Ensure all cards have title and image
        for (let card of cards) {
          if (!card.cardTitle || !card.cardImage) {
            return res.status(400).json({
              success: false,
              message: "Each card must have both title and image.",
            });
          }
        }
      }
    }

    // ----- Only one published page at a time -----
    if (status === "published") {
      await AffiliateBP.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    const page = new AffiliateBP({
      webpageHeading,
      webpageDescription,
      articles,
      cards,
      cardsHeading: req.body.cardsHeading || "",
      cardsDescription: req.body.cardsDescription || "",
      status: status || "draft",
    });

    await page.save();

    res.status(201).json({ success: true, data: page });
    console.log("Affiliate BP PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating Affiliate BP page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createPageBP;


