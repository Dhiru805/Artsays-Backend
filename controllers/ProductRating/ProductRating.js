const mongoose = require('mongoose');
const Review = require("../../Models/Productrating");
const User = require("../../Models/usermode"); 

const submitReview = async (req, res) => {
  try {
    const { userId, productId, rating, title, description } = req.body;

    if (!userId || !productId || !rating || !title || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const imagePaths = req.files?.map(file => file.path.replace(/\\/g, "/")) || [];

    const newReview = new Review({
      userId,
      productId,
      rating,
      title,
      description,
      photos: imagePaths
    });

    await newReview.save();

    res.status(201).json({ success: true, message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getUserReview = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing userId or productId" });
    }

    const review = await Review.findOne({ userId, productId });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId").populate("productId");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const userIdFromToken = req.userID;

    if (!userIdFromToken) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
    }

    const user = await User.findById(userIdFromToken);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    if (user.role !== 'super-admin') {
      return res.status(403).json({ success: false, message: "Only super-admins can edit reviews." });
    }

    let { productId, rating, title, description, existingPhotos } = req.body;

    try {
      if (typeof productId === "string" && productId.includes("{") && productId.includes("_id")) {
        productId = JSON.parse(productId)._id;
      }
    } catch (err) {
      return res.status(400).json({ success: false, message: "Malformed productId" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const review = await Review.findOne({ productId });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    const updatedFields = {};

    if (rating !== undefined) {
      review.rating = rating;
      updatedFields.rating = rating;
    }
    if (title !== undefined) {
      review.title = title;
      updatedFields.title = title;
    }
    if (description !== undefined) {
      review.description = description;
      updatedFields.description = description;
    }

    const uploadedNewPhotos = req.files?.map(file => file.path.replace(/\\/g, "/")) || [];

    if (!Array.isArray(existingPhotos)) {
      if (typeof existingPhotos === "string") {
        existingPhotos = [existingPhotos];
      } else {
        existingPhotos = [];
      }
    }

    review.photos = [...existingPhotos, ...uploadedNewPhotos];
    updatedFields.photos = review.photos;

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  submitReview,
  getUserReview,
  getAllReviews,
  updateReview,
};
