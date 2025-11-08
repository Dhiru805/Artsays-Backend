const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/contactUsMulter"); 
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
  
} = require("../controllers/ContactUs");

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
// const { uploadcontactus } = require("../Middlewares/Multerfile/multerUploads");

// // Destructure functions from ContactUs controller
// const {
//   createPage,
//   updatePage,
//   deletePage,
//   getPages,
//   getPublishedPage,
// } = require("../controllers/ContactUs");

// // ----------------------------
// // Create a ContactUs page
// // ----------------------------
// router.post("/create", uploadcontactus, createPage);

// // ----------------------------
// // Update a ContactUs page
// // ----------------------------
// router.put("/update/:id", uploadcontactus, updatePage);

// // ----------------------------
// // Delete a ContactUs page
// // ----------------------------
// router.delete("/delete/:id", deletePage);

// // ----------------------------
// // Get all ContactUs pages
// // ----------------------------
// router.get("/", getPages);

// // ----------------------------
// // Get latest published ContactUs page
// // ----------------------------
// router.get("/published", getPublishedPage);

// module.exports = router;
