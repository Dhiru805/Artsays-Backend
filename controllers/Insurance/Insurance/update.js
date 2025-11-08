// const InsurancePage = require("../../../Models/Insurance");
// const path = require("path");

// const updateInsurancePage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const page = await InsurancePage.findById(id);
//     if (!page)
//       return res.status(404).json({ success: false, message: "Page not found" });

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
//     try {
//       const section1CardsFromClient =
//         typeof req.body.section1Cards === "string"
//           ? JSON.parse(req.body.section1Cards)
//           : req.body.section1Cards || [];

//       section1Cards = section1CardsFromClient.map((card, idx) => {
//         const file = files.find(
//           (f) => f.fieldname === `section1Cards[${idx}][image]`
//         );
//         return {
//           image: file
//             ? path.join("uploads", "insurance", file.filename)
//             : card.image || null,
//           title: card.title,
//           description: card.description,
//         };
//       });
//     } catch {
//       section1Cards = page.section1Cards || [];
//     }

//     // ---------- SECTION 2 CARDS ----------
//     let section2Cards = [];
//     try {
//       const section2FromClient =
//         typeof req.body.section2Cards === "string"
//           ? JSON.parse(req.body.section2Cards)
//           : req.body.section2Cards || [];

//       section2Cards = section2FromClient.map((card) => ({
//         title: card.title,
//         description: card.description,
//       }));
//     } catch {
//       section2Cards = page.section2Cards || [];
//     }

//     // ---------- ONLY ONE PUBLISHED PAGE ----------
//     if (status === "published") {
//       await InsurancePage.updateMany(
//         { status: "published", _id: { $ne: id } },
//         { $set: { status: "draft" } }
//       );
//     }

//     // ---------- UPDATE FIELDS ----------
//     page.section1Heading = section1Heading || page.section1Heading;
//     page.section1Description = section1Description || page.section1Description;
//     page.section1Cards = section1Cards;
//     page.section2Heading = section2Heading || page.section2Heading;
//     page.section2Description = section2Description || page.section2Description;
//     page.section2Cards = section2Cards;
//     page.section3Heading = section3Heading || page.section3Heading;
//     page.section3Description = section3Description || page.section3Description;
//     page.status = status || page.status;

//     await page.save();

//     res.status(200).json({ success: true, data: page });
//     console.log("INSURANCE PAGE UPDATED:", page);
//   } catch (error) {
//     console.error("Error updating Insurance page:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = updateInsurancePage;



const InsurancePage = require("../../../Models/Insurance");
const path = require("path");

const updateInsurancePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await InsurancePage.findById(id);
    if (!page)
      return res.status(404).json({ success: false, message: "Page not found" });

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
    try {
      const section1CardsFromClient =
        typeof req.body.section1Cards === "string"
          ? JSON.parse(req.body.section1Cards)
          : req.body.section1Cards || [];

      section1Cards = section1CardsFromClient.map((card, idx) => {
        const file = files.find(
          (f) => f.fieldname === `section1Cards[${idx}][image]`
        );
        return {
          image: file
            ? path.join("uploads", "insurance", file.filename)
            : card.image || null,
          title: card.title,
          description: card.description,
        };
      });
    } catch {
      section1Cards = page.section1Cards || [];
    }

    // ---------- SECTION 2 CARDS ----------
    let section2Cards = [];
    try {
      const section2FromClient =
        typeof req.body.section2Cards === "string"
          ? JSON.parse(req.body.section2Cards)
          : req.body.section2Cards || [];

      section2Cards = section2FromClient.map((card) => ({
        title: card.title,
        description: card.description,
      }));
    } catch {
      section2Cards = page.section2Cards || [];
    }

    // ---------- SECTION 3 CARDS ----------
    let section3Cards = [];
    try {
      const section3FromClient =
        typeof req.body.section3Cards === "string"
          ? JSON.parse(req.body.section3Cards)
          : req.body.section3Cards || [];

      section3Cards = section3FromClient.map((card) => ({
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
    } catch {
      section3Cards = page.section3Cards || [];
    }

    // ---------- ONLY ONE PUBLISHED PAGE ----------
    if (status === "published") {
      await InsurancePage.updateMany(
        { status: "published", _id: { $ne: id } },
        { $set: { status: "draft" } }
      );
    }

    // ---------- UPDATE FIELDS ----------
    page.section1Heading = section1Heading || page.section1Heading;
    page.section1Description = section1Description || page.section1Description;
    page.section1Cards = section1Cards;

    page.section2Heading = section2Heading || page.section2Heading;
    page.section2Description = section2Description || page.section2Description;
    page.section2Cards = section2Cards;

    page.section3Heading = section3Heading || page.section3Heading;
    page.section3Description = section3Description || page.section3Description;
    page.section3Cards = section3Cards;

    page.status = status || page.status;

    await page.save();

    res.status(200).json({ success: true, data: page });
    console.log("INSURANCE PAGE UPDATED:", page);
  } catch (error) {
    console.error("Error updating Insurance page:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = updateInsurancePage;
