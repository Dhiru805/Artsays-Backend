
const ContactUs = require("../../../Models/contactus");
const path = require("path");

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { webpageHeading, webpageDescription, status } = req.body;

    const page = await ContactUs.findById(id);
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    const files = req.files || [];

    // ----- Handle Banner Image -----
    const bannerFile = files.find((f) => f.fieldname === "bannerImage");
    const bannerImagePath = bannerFile
      ? path.join("uploads", "contactus", bannerFile.filename)
      : page.bannerImage; 

    if (!bannerImagePath) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required.",
      });
    }

    // ----- Handle Cards -----
    let cards = [];
    try {
      const cardsFromClient = req.body.cards;
      const parsedCards =
        typeof cardsFromClient === "string"
          ? JSON.parse(cardsFromClient)
          : cardsFromClient || [];

      cards = parsedCards.map((c) => ({
        cardHeading: c.cardHeading || "",
        cardDescription: c.cardDescription || "",
      }));
    } catch (err) {
      console.error("Failed to parse cards:", err);
      cards = page.cards || [];
    }


    if (cards.length === 0) cards = page.cards || [];

    // ----- Update published status -----
    if (status === "published") {
      await ContactUs.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    // ----- Update page -----
    page.webpageHeading = webpageHeading || page.webpageHeading;
    page.webpageDescription = webpageDescription || page.webpageDescription;
    page.bannerImage = bannerImagePath;
    page.cards = cards;
    page.status = status || page.status;

    await page.save();

    res.status(200).json({ success: true, data: page });
    console.log("CONTACT US PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Contact Us page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePage;



