const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/certificateCMSMulter"); 
const {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPublishedPage,
} = require("../controllers/certificateCMS");

router.get("/", getPages);

router.get("/published", getPublishedPage);

router.post("/create", upload, createPage);

router.put("/update/:id", upload, updatePage);

router.delete("/delete/:id", deletePage);

module.exports = router;
