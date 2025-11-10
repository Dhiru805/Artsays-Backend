const mongoose = require("mongoose");

const ProductCouponCodeSchema = new mongoose.Schema(
  {
    couponName: {
      type: String,
      required: [true, "Coupon name is required"],
      trim: true,
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["Artist", "Seller"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Product ID is required"],
      ref: "Product",
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount percentage is required"],
      min: [1, "Discount percentage must be at least 1"],
      max: [100, "Discount percentage cannot exceed 100"],
    },
    applicationType: {
      type: String,
      required: [true, "Coupon application type is required"],
      enum: ["immediately", "afterCheckout"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProductCouponCodeSchema.index(
  { couponName: 1, productId: 1 },
  { unique: true }
);

const ProductCouponCode = mongoose.model(
  "ProductCouponCode",
  ProductCouponCodeSchema
);

module.exports = ProductCouponCode;
