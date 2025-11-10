const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/insuranceMulter");
const {
  createInsuranceSetting: createInsurancePage,
  updateInsuranceSetting: updateInsurancePage,
  deleteInsuranceSetting: deleteInsurancePage,
  getInsurancePages,
  getPublishedInsurancePage,
} = require("../controllers/Insurance");

router.get("/", getInsurancePages);

router.get("/published", getPublishedInsurancePage);

router.post("/create", upload, createInsurancePage);

router.put("/update/:id", upload, updateInsurancePage);

router.delete("/delete/:id", deleteInsurancePage);

module.exports = router;
