
const Affiliate = require("../../../Models/affiliate");
const path = require("path");

const createPage = async (req, res) => {
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
                        ? path.join("uploads", "affiliate", file.filename)
                        : null,
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
                            ? path.join("uploads", "affiliate", file.filename)
                            : null,
                    };
                });

            
                for (let card of cards) {
                    if (!card.cardTitle || !card.cardImage) {
                        return res.status(400).json({
                            success: false,
                            message:
                                "Each card must have title, description and image.",
                        });
                    }
                }
            }
        }

        // ----- Only one published page at a time -----
        if (status === "published") {
            await Affiliate.updateMany(
                { status: "published" },
                { $set: { status: "draft" } }
            );
        }

        const page = new Affiliate({
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
        console.log("Affiliate PAGE CREATED:", page);
    } catch (error) {
        console.error("Error creating Affiliate page:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = createPage;


