const express = require("express");
const router = express.Router();

const {
  createPage,
  updatePage,
  deletePage,
  getPages,
  getPagesById,
} = require("../controllers/ArtsaysGallery");

router.post("/create", createPage);

router.put("/update/:id", updatePage);

router.delete("/delete/:id", deletePage);

router.get("/", getPages);

router.get("/:id", getPagesById);

module.exports = router;
