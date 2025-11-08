const PartnerPage = require("../../../Models/Partner");
const path = require("path");

const createPartnerPage = async (req, res) => {
  try {
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

    // ---------- CARDS ----------
    let cards = [];
    const cardsFromClient = req.body.cards
      ? typeof req.body.cards === "string"
        ? JSON.parse(req.body.cards)
        : req.body.cards
      : [];

    if (Array.isArray(cardsFromClient)) {
      cards = cardsFromClient.map((card, idx) => {
        const imageFile = files.find((f) => f.fieldname === `cards[${idx}][image]`);
        const sectionImageFile = files.find(
          (f) => f.fieldname === `cards[${idx}][sectionImage]`
        );

        return {
          title: card.title || "",
          image: imageFile
            ? path.join("uploads", "partner", imageFile.filename)
            : card.image || null,
          sectionHeading: card.sectionHeading || "",
          sectionDescription: card.sectionDescription || "",
          sectionImage: sectionImageFile
            ? path.join("uploads", "partner", sectionImageFile.filename)
            : card.sectionImage || null,
        };
      });
    }

    // ---------- SECTION 1 (Carousel) ----------
    let section1Images = [];
    const section1Files = files.filter((f) =>
      f.fieldname.startsWith("section1Images")
    );
    if (section1Files.length > 0) {
      section1Images = section1Files.map((file) =>
        path.join("uploads", "partner", file.filename)
      );
    }

    // ---------- SECTION 2 ----------
    let section2Cards = [];
    const section2FromClient = req.body.section2Cards
      ? typeof req.body.section2Cards === "string"
        ? JSON.parse(req.body.section2Cards)
        : req.body.section2Cards
      : [];

    if (Array.isArray(section2FromClient)) {
      section2Cards = section2FromClient.map((card, idx) => {
        const imageFile = files.find(
          (f) => f.fieldname === `section2Cards[${idx}][image]`
        );
        return {
          title: card.title || "",
          description: card.description || "",
          image: imageFile
            ? path.join("uploads", "partner", imageFile.filename)
            : card.image || null,
        };
      });
    }

    // ---------- ONE PUBLISHED PAGE ----------
    if (status === "published") {
      await PartnerPage.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    // ---------- CREATE PAGE ----------
    const page = new PartnerPage({
      mainHeading,
      mainDescription,
      buttonName,
      buttonLink,
      cards,
      section1Heading,
      section1Description,
      section1Images,
      section2Heading,
      section2Description,
      section2Cards,
      status: status || "draft",
    });

    await page.save();
    res.status(201).json({ success: true, data: page });
    console.log("PARTNER PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating Partner page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createPartnerPage;
