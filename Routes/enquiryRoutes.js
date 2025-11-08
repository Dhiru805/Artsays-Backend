const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
} = require("../controllers/Enquiry/index");

router.post("/create", createEnquiry);

router.get("/", getAllEnquiries);

router.get("/:id", getEnquiryById);

router.delete("/delete/:id", deleteEnquiry);

module.exports = router;
