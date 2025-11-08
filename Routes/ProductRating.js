const express = require("express");
const router = express.Router();
const { submitReview, getUserReview, getAllReviews, updateReview  } = require("../controllers/ProductRating/ProductRating");
const authenticateToken = require("../Middlewares/authMiddleware");

const upload = require("../Middlewares/Multerfile/ProductRating"); 

const mongoose = require("mongoose");

router.post("/submit", upload.array("file", 3), submitReview);
router.get("/user-review", getUserReview);
router.get("/all-reviews", getAllReviews);
router.put("/update-review",authenticateToken,upload.array("photos", 3),updateReview);
module.exports = router;
