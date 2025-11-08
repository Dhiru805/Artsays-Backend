const Certification = require("../../../Models/certificateCMS");
const path = require("path");

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Certification.findById(id);
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

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

    // ----- Section 1 -----
    let section1Cards = [];
    try {
      const section1FromClient =
        typeof req.body.section1 === "string"
          ? JSON.parse(req.body.section1)
          : req.body.section1 || { cards: [] };

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
    } catch {
      section1Cards = page.section1.cards || [];
    }

    // ----- Section 2 -----
    let section2Cards = [];
    try {
      const section2FromClient =
        typeof req.body.section2 === "string"
          ? JSON.parse(req.body.section2)
          : req.body.section2 || { cards: [] };

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
    } catch {
      section2Cards = page.section2.cards || [];
    }

    // ----- Certificate Section -----
    let certificateData = {};
    try {
      const file = files.find((f) => f.fieldname === "certificateSection[image]");

      certificateData = {
        heading: certificateHeading || page.certificateSection.heading,
        description: certificateDescription || page.certificateSection.description,
        image: file
          ? path.join("uploads", "certificateCMS", file.filename)
          : page.certificateSection.image || null,
      };
    } catch {
      certificateData = page.certificateSection;
    }

    // ----- Only one published page allowed -----
    if (status === "published") {
      await Certification.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    // ----- Update page -----
    page.webpageHeading = webpageHeading || page.webpageHeading;
    page.webpageDescription = webpageDescription || page.webpageDescription;
    page.buttonName = buttonName || page.buttonName;
    page.buttonLink = buttonLink || page.buttonLink;
    page.section1Heading = section1Heading || page.section1Heading;
    page.section1Description = section1Description || page.section1Description;
    page.section2Heading = section2Heading || page.section2Heading;
    page.section2Description = section2Description || page.section2Description;
    page.section1.cards = section1Cards;
    page.section2.cards = section2Cards;
    page.certificateSection = certificateData;
    page.status = status || page.status;

    await page.save();

    res.status(200).json({ success: true, data: page });
    console.log("CERTIFICATION PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Certification page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updatePage;
