const { reviewController } = require("./ProductRating");
router.post("/submit", reviewController.submitReview);
