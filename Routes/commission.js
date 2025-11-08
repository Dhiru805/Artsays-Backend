const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/commissionMulter");
const uploads = require("../Middlewares/Multerfile/seoMulter");
const {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPublishedPage,
  createSEO,
  updateSEO,
  getSEO,
  
} = require("../controllers/Commission");

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
// const { uploadcommission, getFilePath } = require("../Middlewares/Multerfile/multerUploads");

// // Destructure functions from Commission controller
// const {
//   createPage,
//   updatePage,
//   deletePage,
//   getPages,
//   getPublishedPage,
// } = require("../controllers/Commission");

// // ----------------------------
// // Create a Commission page
// // ----------------------------
// router.post("/create", uploadcommission, createPage);

// // ----------------------------
// // Update a Commission page
// // ----------------------------
// router.put("/update/:id", uploadcommission, updatePage);

// // ----------------------------
// // Delete a Commission page
// // ----------------------------
// router.delete("/delete/:id", deletePage);

// // ----------------------------
// // Get all Commission pages
// // ----------------------------
// router.get("/", getPages);

// // ----------------------------
// // Get latest published Commission page
// // ----------------------------
// router.get("/published", getPublishedPage);

// module.exports = router;
