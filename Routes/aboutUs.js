const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/aboutUsMulter");
const uploads = require("../Middlewares/Multerfile/seoMulter");
const {
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getPages,
  getPublishedPage,
  updateSEO,
  getSEO,
  createSEO,
} = require("../controllers/aboutUs");

router.post("/create", createAboutUs);
router.post("/createSEO", uploads, createSEO);

router.put("/update/:id", updateAboutUs);
router.put("/updateSEO/:id", uploads, updateSEO);

router.delete("/delete/:id", deleteAboutUs);

router.get("/", getPages);
router.get("/getSEO", getSEO);
router.get("/published", getPublishedPage);

module.exports = router;
