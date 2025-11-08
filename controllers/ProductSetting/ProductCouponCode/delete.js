const ProductCouponCode = require("../../../Models/productcouponcode");

const deleteProductCouponCode = async (req, res) => {
  try {
    const { id } = req.params;

    const productCouponCode = await ProductCouponCode.findById(id);
    if (!productCouponCode) {
      return res.status(404).json({ error: "Product Coupon Code not found" });
    }

    await ProductCouponCode.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Coupon Code deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductCouponCode;