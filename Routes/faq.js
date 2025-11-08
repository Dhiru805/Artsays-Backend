const express = require("express");
const {
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQ
} = require("../controllers/FAQ/index");
const router = express.Router();

router.post("/create-FAQ", createFAQ);
router.put("/update-FAQ/:id", updateFAQ);
router.delete("/delete-FAQ/:id", deleteFAQ);
router.get("/get-FAQ", getFAQ);

module.exports = router;