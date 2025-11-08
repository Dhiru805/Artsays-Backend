// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BuyerRequest',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    photos: {
      type: [String], // Store image file paths
      validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    }
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

module.exports = mongoose.model('Review', ReviewSchema);
