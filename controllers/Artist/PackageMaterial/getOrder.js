const mongoose = require("mongoose");
const PackageMaterialArtist = require("../../../Models/packagematerialartist");

const getOrder = [
  async (req, res) => {
    try {
      const { userId } = req.params;

      const query = {};
      if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        query.userId = userId;
      }

      const newOrder = await PackageMaterialArtist.find(query)
        .populate({
          path: "material",
          select:
            "materialName size capacity price stockAvailable minimumOrder vendorSupplier ecoFriendly deliveryEstimation",
          populate: [
            { path: "materialName", select: "materialName materialNameImage" },
            { path: "size", select: "materialSize" },
            { path: "capacity", select: "materialCapacity" },
          ],
        })
        .populate({
          path: "deliveryAddress",
          select: "address name lastName",
        })
        .populate({
          path: "stamp",
          select: "materialStamp materialStampImage price",
        })
        .populate({
          path: "stickers",
          select: "materialStickers materialStickersImage price",
        })
        .populate({
          path: "vouchers",
          select: "materialVouchers materialVouchersImage price",
        })
        .populate({
          path: "card",
          select: "materialCard materialCardImage price",
        })
        .exec();

      res.status(200).json({
        success: true,
        message: "order fetched successfully",
        data: newOrder,
      });
    } catch (error) {
      console.error("Error fetching material order:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
];

module.exports = getOrder;
