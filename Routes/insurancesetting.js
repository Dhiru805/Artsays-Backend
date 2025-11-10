const express = require("express");
const {
  createInsuranceSetting,
  updateInsuranceSetting,
  getInsuranceSetting,
  deleteInsuranceSetting,
} = require("../controllers/Insurance/index");
const router = express.Router();

router.post("/create-insurance-setting", createInsuranceSetting);
router.put("/update-insurance-setting/:id", updateInsuranceSetting);
router.delete("/delete-insurance-setting/:id", deleteInsuranceSetting);
router.get("/get-insurance-settings", getInsuranceSetting);

module.exports = router;