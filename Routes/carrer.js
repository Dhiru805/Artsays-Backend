const express = require("express");
const {
  createCareer,
  updateCareer,
  deleteCareer,
  getCareer,
  getCareerById,
  updateCareerStatus,
} = require("../controllers/Carrer/index");

const router = express.Router();

router.post("/create-career", createCareer);
router.put("/update-career/:id", updateCareer);
router.delete("/delete-career/:id", deleteCareer);
router.get("/get-career", getCareer);

router.get("/get-career/:id", getCareerById)

router.post("/update-career-status/:id",updateCareerStatus);
module.exports = router;
