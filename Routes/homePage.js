const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/homePageMulter");
const uploads = require("../Middlewares/Multerfile/seoMulter");
const {
  createHomePage,
  updateHomePage,
  deleteHomePage,
  getPages,
  getPublishedPage,
  createSEO,
  updateSEO,
  getSEO,
  
} = require("../controllers/homePage");


router.post("/create", createHomePage);
router.put("/update/:id", updateHomePage);
router.delete("/delete/:id", deleteHomePage);
router.get("/", getPages);
router.get("/published", getPublishedPage);

router.post("/createSEO", uploads, createSEO);
router.put("/updateSEO/:id", uploads, updateSEO);
router.get("/getSEO", getSEO);

module.exports = router;
