const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/affiliateMulter");
const uploads = require("../Middlewares/Multerfile/seoMulter");

const {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPublishedPage,
  updateSEO,
  getSEO,
  createSEO,
} = require("../controllers/Affiliate");

router.post("/create", upload, createPage);

router.put("/update/:id", upload, updatePage);

router.delete("/delete/:id", deletePage);

router.get("/", getPages);

router.get("/published", getPublishedPage);

router.post("/createSEO", uploads, createSEO);
router.put("/updateSEO/:id", uploads, updateSEO);
router.get("/getSEO", getSEO);

module.exports = router;










// const express = require("express");
// const router = express.Router();
// const { uploadAffiliate } = require("../Middlewares/Multerfile/multerUploads"); // updated Multer

// // Destructure functions from Affiliate controller
// const {
//   createPage,
//   updatePage,
//   deletePage,
//   getPages,
//   getPublishedPage,
// } = require("../controllers/Affiliate");

// // ----------------------------
// // Create a page (banner + card)
// // ----------------------------
// router.post("/create", uploadAffiliate, createPage);

// // ----------------------------
// // Update a page (banner + card)
// // ----------------------------
// router.put("/update/:id", uploadAffiliate, updatePage);

// // ----------------------------
// // Delete a page
// // ----------------------------
// router.delete("/delete/:id", deletePage);

// // ----------------------------
// // Get all pages
// // ----------------------------
// router.get("/", getPages);

// // ----------------------------
// // Get latest published page
// // ----------------------------
// router.get("/published", getPublishedPage);

// module.exports = router;
