const mongoose = require("mongoose");

const certificationsSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["Artist", "Seller"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    mainCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    },
    certificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificationSetting",
      required: true,
    },
    certificationProvider: {
      type: String,
      required: true,
      enum: ["inhouse", "thirdparty"],
    },
    estimatedDays: {
      type: Number,
      required: true,
      min: [1, "Estimated days must be at least 1"],
    },
    certificationPrice: {
      type: Number,
      required: true,
      default: 99,
    },
  },
  { timestamps: true }
);

certificationsSchema.index(
  { userId: 1, productId: 1, certificationId: 1 },
  { unique: true }
);

module.exports = mongoose.model("certifications", certificationsSchema);
