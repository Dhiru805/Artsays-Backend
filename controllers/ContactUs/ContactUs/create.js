const ContactUs = require("../../../Models/contactus");
const path = require("path");

const createPage = async (req, res) => {
    try {
        const { webpageHeading, webpageDescription, status } = req.body;
        const files = req.files || [];

        // ----- Banner Image -----
        const bannerFile = files.find((f) => f.fieldname === "bannerImage");
        if (!bannerFile) {
            return res.status(400).json({
                success: false,
                message: "Banner image is required.",
            });
        }
        const bannerImagePath = path.join("uploads", "contactus", bannerFile.filename);

        // ----- Cards -----
        let cards = [];
        const cardsFromClient = req.body.cards;
        if (cardsFromClient) {
            const parsedCards =
                typeof cardsFromClient === "string"
                    ? JSON.parse(cardsFromClient)
                    : cardsFromClient;

            if (parsedCards && Array.isArray(parsedCards)) {
                cards = parsedCards.map((c) => ({
                    cardHeading: c.cardHeading || "",
                    cardDescription: c.cardDescription || "",
                }));
            }
        }

        if (status === "published") {
            await ContactUs.updateMany(
                { status: "published" },
                { $set: { status: "draft" } }
            );
        }

        const page = new ContactUs({
            webpageHeading,
            webpageDescription,
            bannerImage: bannerImagePath,
            cards,
            status: status || "draft",
        });

        await page.save();

        res.status(201).json({ success: true, data: page });
        console.log("Contact Us PAGE CREATED:", page);
    } catch (error) {
        console.error("Error creating Contact Us page:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = createPage;









// const ContactUs = require("../../../Models/contactus");
// const { getFilePath } = require("../../../Middlewares/Multerfile/multerUploads"); // updated import

// const createPage = async (req, res) => {
//     try {
//         const { webpageHeading, webpageDescription, status } = req.body;
//         const files = req.files || [];

//         // ----- Banner Image -----
//         const bannerFile = files.find((f) => f.fieldname === "bannerImage");
//         if (!bannerFile) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Banner image is required.",
//             });
//         }
//         const bannerImagePath = getFilePath(bannerFile, "contactUs"); // use helper

//         // ----- Cards -----
//         let cards = [];
//         const cardsFromClient = req.body.cards;
//         if (cardsFromClient) {
//             const parsedCards =
//                 typeof cardsFromClient === "string"
//                     ? JSON.parse(cardsFromClient)
//                     : cardsFromClient;

//             if (parsedCards && Array.isArray(parsedCards)) {
//                 cards = parsedCards.map((c) => ({
//                     cardHeading: c.cardHeading || "",
//                     cardDescription: c.cardDescription || "",
//                 }));
//             }
//         }

//         // ----- Only one published page at a time -----
//         if (status === "published") {
//             await ContactUs.updateMany(
//                 { status: "published" },
//                 { $set: { status: "draft" } }
//             );
//         }

//         const page = new ContactUs({
//             webpageHeading,
//             webpageDescription,
//             bannerImage: bannerImagePath,
//             cards,
//             status: status || "draft",
//         });

//         await page.save();

//         res.status(201).json({ success: true, data: page });
//         console.log("Contact Us PAGE CREATED:", page);
//     } catch (error) {
//         console.error("Error creating Contact Us page:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// module.exports = createPage;
