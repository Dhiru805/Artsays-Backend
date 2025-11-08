const Certification = require("../../../Models/certificateCMS");
const path = require("path");

const createPage = async (req, res) => {
  try {
    const {
      webpageHeading,
      webpageDescription,
      buttonName,
      buttonLink,
      section1Heading,
      section1Description,
      section2Heading,
      section2Description,
      certificateHeading,
      certificateDescription,
      status,
    } = req.body;

    const files = req.files || [];

    // ----- Section 1 Cards -----
    let section1Cards = [];
    const section1FromClient = req.body.section1
      ? typeof req.body.section1 === "string"
        ? JSON.parse(req.body.section1)
        : req.body.section1
      : { cards: [] };

    if (section1FromClient.cards && Array.isArray(section1FromClient.cards)) {
      section1Cards = section1FromClient.cards.map((card, idx) => {
        const file = files.find(
          (f) => f.fieldname === `section1[cards][${idx}][image]`
        );

        return {
          title: card.title,
          description: card.text,
          image: file
            ? path.join("uploads", "certificateCMS", file.filename)
            : card.image || null,
        };
      });
    }

    // ----- Section 2 Cards -----
    let section2Cards = [];
    const section2FromClient = req.body.section2
      ? typeof req.body.section2 === "string"
        ? JSON.parse(req.body.section2)
        : req.body.section2
      : { cards: [] };

    if (section2FromClient.cards && Array.isArray(section2FromClient.cards)) {
      section2Cards = section2FromClient.cards.map((card, idx) => {
        const file = files.find(
          (f) => f.fieldname === `section2[cards][${idx}][image]`
        );

        return {
          title: card.title,
          description: card.description,
          image: file
            ? path.join("uploads", "certificateCMS", file.filename)
            : card.image || null,
        };
      });
    }

    // ----- Certificate Section -----
    let certificateData = {};
    try {
      const file = files.find((f) => f.fieldname === "certificateSection[image]");

      certificateData = {
        heading: certificateHeading || "",
        description: certificateDescription || "",
        image: file
          ? path.join("uploads", "certificateCMS", file.filename)
          : null,
      };
    } catch {
      certificateData = { heading: "", description: "", image: null };
    }

    // ----- Only one published page allowed -----
    if (status === "published") {
      await Certification.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    // ----- Create Page -----
    const page = new Certification({
      webpageHeading,
      webpageDescription,
      buttonName,
      buttonLink,
      section1Heading,
      section1Description,
      section1: { cards: section1Cards },
      section2Heading,
      section2Description,
      section2: { cards: section2Cards },
      certificateSection: certificateData,
      status: status || "draft",
    });

    await page.save();
    res.status(201).json({ success: true, data: page });
    console.log("CERTIFICATION PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating Certification page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createPage;
