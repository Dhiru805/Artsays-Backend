const express = require("express");

const {
  createCelebrities,
  getCelebrities,
  upload,
  updateCelebrity,
  removeCelebrity,
} = require("../controllers/celebraties/celebraties");

const router = express.Router();

router.post(
  "/create-celebrities",
  upload.single("profilePicture"),
  createCelebrities
);
router.get("/celebrities", getCelebrities);
router.put(
  "/update-celebrity/:id",
  upload.single("profilePicture"),
  updateCelebrity
);
router.delete("/remove-celebrity/:id", removeCelebrity);

module.exports = router;
