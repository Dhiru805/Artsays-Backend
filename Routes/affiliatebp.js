const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/affiliateBPMulter");
const uploads = require("../Middlewares/Multerfile/seoMulter");
const {
  createPageBP,
  updatePageBP,
  deletePageBP,
  getPagesBP,
  getPublishedPageBP,
  updateSEO,
  getSEO,
  createSEO,
} = require("../controllers/AffiliateBP");

router.post("/create", upload, createPageBP);

router.put("/update/:id", upload, updatePageBP);

router.delete("/delete/:id", deletePageBP);

router.get("/", getPagesBP);

router.get("/published", getPublishedPageBP);

router.post("/createSEO", uploads, createSEO);
router.put("/updateSEO/:id", uploads, updateSEO);
router.get("/getSEO", getSEO);

module.exports = router;






// const express = require("express");
// const router = express.Router();
// const { uploadAffiliateBP } = require("../Middlewares/Multerfile/multerUploads"); // updated Multer

// // Destructure functions from AffiliateBP controller
// const {
//   createPageBP,
//   updatePageBP,
//   deletePageBP,
//   getPagesBP,
//   getPublishedPageBP,
// } = require("../controllers/AffiliateBP");

// // ----------------------------
// // Create a BP page (banner + card)
// // ----------------------------
// router.post("/create", uploadAffiliateBP, createPageBP);

// // ----------------------------
// // Update a BP page (banner + card)
// // ----------------------------
// router.put("/update/:id", uploadAffiliateBP, updatePageBP);

// // ----------------------------
// // Delete a BP page
// // ----------------------------
// router.delete("/delete/:id", deletePageBP);

// // ----------------------------
// // Get all BP pages
// // ----------------------------
// router.get("/", getPagesBP);

// // ----------------------------
// // Get latest published BP page
// // ----------------------------
// router.get("/published", getPublishedPageBP);

// module.exports = router;

