const mongoose = require("mongoose");
const ProductCouponCode = require("../../../Models/productcouponcode");

const updateProductCouponCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { couponName, userType, userId, productId, discountPercentage, applicationType } = req.body;


    if (!couponName) {
      return res.status(400).json({ error: "Coupon name is required" });
    }
    if (!userType) {
      return res.status(400).json({ error: "User type is required" });
    }
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    if (!discountPercentage || discountPercentage <= 0 || discountPercentage > 100) {
      return res.status(400).json({ error: "Discount percentage must be between 1 and 100" });
    }
    if (!applicationType) {
      return res.status(400).json({ error: "Coupon application type is required" });
    }


    if (!["Artist", "Seller"].includes(userType)) {
      return res.status(400).json({ error: "Invalid user type. Must be 'Artist' or 'Seller'" });
    }
    if (!["immediately", "afterCheckout"].includes(applicationType)) {
      return res.status(400).json({ error: "Invalid application type. Must be 'immediately' or 'afterCheckout'" });
    }


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid coupon ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }


    const existingCoupon = await ProductCouponCode.findOne({
      couponName,
      _id: { $ne: id }, 
    });
    if (existingCoupon) {
      return res.status(400).json({
        error: `Coupon name '${couponName}' is already in use by another coupon. Please choose a different name.`,
      });
    }


    const updatedProductCouponCode = await ProductCouponCode.findByIdAndUpdate(
      id,
      { couponName, userType, userId, productId, discountPercentage, applicationType },
      { new: true, runValidators: true }
    );

    if (!updatedProductCouponCode) {
      return res.status(404).json({ error: "Product Coupon Code not found" });
    }

    res.status(200).json({
      message: "Product Coupon Code updated successfully",
      data: updatedProductCouponCode,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Coupon name '${req.body.couponName}' is already in use. Please choose a different code.`,
      });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors.join(", ") });
    }
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

module.exports = updateProductCouponCode;