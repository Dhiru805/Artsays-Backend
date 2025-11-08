const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/whyartsaysMulter");
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
  
} = require("../controllers/WhyArtSays");

router.post("/create", upload, createPage);

router.put("/update/:id", upload, updatePage);

router.delete("/delete/:id", deletePage);

router.get("/", getPages);

router.get("/published", getPublishedPage);

router.post("/createSEO", uploads, createSEO);
router.put("/updateSEO/:id", uploads, updateSEO);
router.get("/getSEO", getSEO);

module.exports = router;

