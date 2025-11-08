
const express = require("express");
const upload = require("../Middlewares/Multerfile/seoMulter");

const {
  createPolicy,
  updatePolicy,
  deletePolicyById,
  getPoliciesByUserId,
  getPolicyById,
  createSEO,
  updateSEO,
  getSEO,
} = require("../controllers/Policy/index");

const router = express.Router();

router.post("/createPolicy", createPolicy);

router.put("/updatePolicy/:id", updatePolicy);

router.delete("/deletePolicy/:id", deletePolicyById);

router.get("/getPolicies/:userId?", getPoliciesByUserId);

router.get("/getPolicy/:id", getPolicyById);

router.post("/createSEO", upload, createSEO);
router.put("/updateSEO/:id", upload, updateSEO);
router.get("/getSEO", getSEO);

module.exports = router;
