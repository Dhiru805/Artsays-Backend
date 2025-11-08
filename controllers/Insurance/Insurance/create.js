// const InsurancePage = require("../../../Models/Insurance");
// const path = require("path");

// const createInsurancePage = async (req, res) => {
//   try {
//     const {
//       section1Heading,
//       section1Description,
//       section2Heading,
//       section2Description,
//       section3Heading,
//       section3Description,
//       status,
//     } = req.body;

//     const files = req.files || [];

//     // ---------- SECTION 1 CARDS ----------
//     let section1Cards = [];
//     const section1CardsFromClient = req.body.section1Cards
//       ? typeof req.body.section1Cards === "string"
//         ? JSON.parse(req.body.section1Cards)
//         : req.body.section1Cards
//       : [];

//     if (Array.isArray(section1CardsFromClient)) {
//       section1Cards = section1CardsFromClient.map((card, idx) => {
//         const imageFile = files.find(
//           (f) => f.fieldname === `section1Cards[${idx}][image]`
//         );
//         return {
//           image: imageFile
//             ? path.join("uploads", "insurance", imageFile.filename)
//             : card.image || null,
//           title: card.title || "",
//           description: card.description || "",
//         };
//       });
//     }

//     // ---------- SECTION 2 CARDS ----------
//     let section2Cards = [];
//     const section2CardsFromClient = req.body.section2Cards
//       ? typeof req.body.section2Cards === "string"
//         ? JSON.parse(req.body.section2Cards)
//         : req.body.section2Cards
//       : [];

//     if (Array.isArray(section2CardsFromClient)) {
//       section2Cards = section2CardsFromClient.map((card) => ({
//         title: card.title || "",
//         description: card.description || "",
//       }));
//     }

//     // ---------- ONLY ONE PUBLISHED PAGE ----------
//     if (status === "published") {
//       await InsurancePage.updateMany(
//         { status: "published" },
//         { $set: { status: "draft" } }
//       );
//     }

//     // ---------- CREATE PAGE ----------
//     const page = new InsurancePage({
//       section1Heading,
//       section1Description,
//       section1Cards,
//       section2Heading,
//       section2Description,
//       section2Cards,
//       section3Heading,
//       section3Description,
//       status: status || "draft",
//     });

//     await page.save();
//     res.status(201).json({ success: true, data: page });
//     console.log("INSURANCE PAGE CREATED:", page);
//   } catch (error) {
//     console.error("Error creating Insurance page:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = createInsurancePage;



const InsurancePage = require("../../../Models/Insurance");
const path = require("path");

const createInsurancePage = async (req, res) => {
  try {
    const {
      section1Heading,
      section1Description,
      section2Heading,
      section2Description,
      section3Heading,
      section3Description,
      status,
    } = req.body;

    const files = req.files || [];

    // ---------- SECTION 1 CARDS ----------
    let section1Cards = [];
    const section1CardsFromClient = req.body.section1Cards
      ? typeof req.body.section1Cards === "string"
        ? JSON.parse(req.body.section1Cards)
        : req.body.section1Cards
      : [];

    if (Array.isArray(section1CardsFromClient)) {
      section1Cards = section1CardsFromClient.map((card, idx) => {
        const imageFile = files.find(
          (f) => f.fieldname === `section1Cards[${idx}][image]`
        );
        return {
          image: imageFile
            ? path.join("uploads", "insurance", imageFile.filename)
            : card.image || null,
          title: card.title || "",
          description: card.description || "",
        };
      });
    }

    // ---------- SECTION 2 CARDS ----------
    let section2Cards = [];
    const section2CardsFromClient = req.body.section2Cards
      ? typeof req.body.section2Cards === "string"
        ? JSON.parse(req.body.section2Cards)
        : req.body.section2Cards
      : [];

    if (Array.isArray(section2CardsFromClient)) {
      section2Cards = section2CardsFromClient.map((card) => ({
        title: card.title || "",
        description: card.description || "",
      }));
    }

    // ---------- SECTION 3 CARDS ----------
    let section3Cards = [];
    const section3CardsFromClient = req.body.section3Cards
      ? typeof req.body.section3Cards === "string"
        ? JSON.parse(req.body.section3Cards)
        : req.body.section3Cards
      : [];

    if (Array.isArray(section3CardsFromClient)) {
      section3Cards = section3CardsFromClient.map((card) => ({
        heading: card.heading || "",
        description: card.description || "",
        price: card.price || "",
        cancelCondition: card.cancelCondition || "",
        eligibility: card.eligibility || "",
        pointers: Array.isArray(card.pointers)
          ? card.pointers.map((p) => p || "")
          : [],
        buttonName: card.buttonName || "",
        buttonLink: card.buttonLink || "",
      }));
    }

    // ---------- ONLY ONE PUBLISHED PAGE ----------
    if (status === "published") {
      await InsurancePage.updateMany(
        { status: "published" },
        { $set: { status: "draft" } }
      );
    }

    // ---------- CREATE PAGE ----------
    const page = new InsurancePage({
      section1Heading,
      section1Description,
      section1Cards,
      section2Heading,
      section2Description,
      section2Cards,
      section3Heading,
      section3Description,
      section3Cards, 
      status: status || "draft",
    });

    await page.save();
    res.status(201).json({ success: true, data: page });
    console.log("INSURANCE PAGE CREATED:", page);
  } catch (error) {
    console.error("Error creating Insurance page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createInsurancePage;
