const ProductCouponCode = require("../../../Models/productcouponcode");

const getProductCouponCodes = async (req, res) => {
  try {
    const productCouponCodes = await ProductCouponCode.find()
      .populate({
        path: "userId",
        select: "name lastName", 
      })
      .populate({
        path: "productId",
        select: "productName finalPrice", 
      });


    const result = productCouponCodes.map((coupon) => {
      const finalPrice = coupon.productId?.finalPrice || 0;
      const discountPercentage = coupon.discountPercentage || 0;
      const finalPriceAfterDiscount = finalPrice * (1 - discountPercentage / 100);

      return {
        _id: coupon._id, 
        couponName: coupon.couponName,
        userType: coupon.userType,
        userId: coupon.userId?._id || "", 
        productId: coupon.productId?._id || "", 
        user: {
          firstName: coupon.userId?.name,
          lastName: coupon.userId?.lastName,
        },
        product: {
          productName: coupon.productId?.productName,
          originalFinalPrice: finalPrice,
          discountPercentage: discountPercentage,
          finalPriceAfterDiscount: parseFloat(finalPriceAfterDiscount.toFixed(2)), 
        },
        applicationType: coupon.applicationType,
        createdAt: coupon.createdAt,
        updatedAt: coupon.updatedAt,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductCouponCodes;