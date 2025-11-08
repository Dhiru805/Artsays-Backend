const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/partnerMulter");
const {
  createPartnerPage,
  updatePartnerPage,
  deletePartnerPage,
  getPartnerPages,
  getPublishedPartnerPage,
} = require("../controllers/partner");

router.get("/", getPartnerPages);

router.get("/published", getPublishedPartnerPage);

router.post("/create", upload, createPartnerPage);

router.put("/update/:id", upload, updatePartnerPage);

router.delete("/delete/:id", deletePartnerPage);

module.exports = router;
