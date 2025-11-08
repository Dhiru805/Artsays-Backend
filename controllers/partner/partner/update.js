const PartnerPage = require("../../../Models/Partner");
const path = require("path");

const updatePartnerPage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await PartnerPage.findById(id);
    if (!page)
      return res.status(404).json({ success: false, message: "Page not found" });

    const {
      mainHeading,
      mainDescription,
      buttonName,
      buttonLink,
      section1Heading,
      section1Description,
      section2Heading,
      section2Description,
      status,
    } = req.body;

    const files = req.files || [];

    // ----- Cards -----
    let cards = [];
    try {
      const cardsFromClient =
        typeof req.body.cards === "string"
          ? JSON.parse(req.body.cards)
          : req.body.cards || [];

      cards = cardsFromClient.map((card, idx) => {
        const file = files.find((f) => f.fieldname === `cards[${idx}][image]`);
        const sectionFile = files.find(
          (f) => f.fieldname === `cards[${idx}][sectionImage]`
        );

        return {
          title: card.title,
          image: file
            ? path.join("uploads", "partner", file.filename)
            : card.image || null,
          sectionHeading: card.sectionHeading,
          sectionDescription: card.sectionDescription,
          sectionImage: sectionFile
            ? path.join("uploads", "partner", sectionFile.filename)
            : card.sectionImage || null,
        };
      });
    } catch {
      cards = page.cards || [];
    }

    // ----- Section 1 Images -----
    let section1Images = [];
    try {
      const section1FromClient =
        typeof req.body.section1Images === "string"
          ? JSON.parse(req.body.section1Images)
          : req.body.section1Images || [];

      section1Images = section1FromClient.map((img, idx) => {
        const file = files.find(
          (f) => f.fieldname === `section1Images[${idx}]`
        );
        return file
          ? path.join("uploads", "partner", file.filename)
          : img;
      });
    } catch {
      section1Images = page.section1Images || [];
    }

    // ----- Section 2 Cards -----
    let section2Cards = [];
    try {
      const section2FromClient =
        typeof req.body.section2Cards === "string"
          ? JSON.parse(req.body.section2Cards)
          : req.body.section2Cards || [];

      section2Cards = section2FromClient.map((card, idx) => {
        const file = files.find(
          (f) => f.fieldname === `section2Cards[${idx}][image]`
        );

        return {
          title: card.title,
          description: card.description,
          image: file
            ? path.join("uploads", "partner", file.filename)
            : card.image || null,
        };
      });
    } catch {
      section2Cards = page.section2Cards || [];
    }

    // ----- Only one published page allowed -----
    if (status === "published") {
      await PartnerPage.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    // ----- Update Page -----
    page.mainHeading = mainHeading || page.mainHeading;
    page.mainDescription = mainDescription || page.mainDescription;
    page.buttonName = buttonName || page.buttonName;
    page.buttonLink = buttonLink || page.buttonLink;
    page.cards = cards;
    page.section1Heading = section1Heading || page.section1Heading;
    page.section1Description = section1Description || page.section1Description;
    page.section1Images = section1Images;
    page.section2Heading = section2Heading || page.section2Heading;
    page.section2Description = section2Description || page.section2Description;
    page.section2Cards = section2Cards;
    page.status = status || page.status;

    await page.save();

    res.status(200).json({ success: true, data: page });
    console.log("PARTNER PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Partner page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePartnerPage;
