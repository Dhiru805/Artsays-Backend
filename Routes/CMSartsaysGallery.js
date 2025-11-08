const express = require("express");
const router = express.Router();

const {
    createPage,
    updatePage,
    deletePage,
    getPages,
    getPagesById,
    getPublishedPage,
    CMSArtsaysGallery,
} = require("../controllers/CMSArtsaysGallery");


router.post("/create", createPage);
router.put("/update/:id", updatePage);
router.delete("/delete/:id", deletePage);
router.get("/", getPages);
router.get("/published", getPublishedPage);
router.get("/profile-pic", CMSArtsaysGallery);
router.get("/:id", getPagesById);

module.exports = router;
