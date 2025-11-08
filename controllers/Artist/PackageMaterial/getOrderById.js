const mongoose = require("mongoose");
const PackageMaterialArtist = require("../../../Models/packagematerialartist");

const getOrderById = [
    async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Valid order id is required.",
                });
            }

            const newOrder = await PackageMaterialArtist.findOne({ 
                _id: id })
                .populate({
                    path: "material",
                    select: "materialName size capacity price stockAvailable minimumOrder vendorSupplier ecoFriendly deliveryEstimation",
                    populate: [
                        { path: "materialName", select: "materialName materialNameImage" },
                        { path: "size", select: "materialSize" },
                        { path: "capacity", select: "materialCapacity"}
                    ]
                })
                .populate({
                    path: "deliveryAddress",
                    select: "address"
                })
                .populate({
                    path: "stamp",
                    select: "materialStamp materialStampImage price"
                })
                .populate({
                    path: "stickers",
                    select: "materialStickers materialStickersImage price"
                })
                .populate({
                    path: "vouchers",
                    select: "materialVouchers materialVouchersImage price"
                })
                .populate({
                    path: "card",
                    select: "materialCard materialCardImage price"
                })
                .exec();

            if (!newOrder) {
                return res.status(404).json({
                success: false,
                message: "order not found for this user.",
                });
            }

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
    }
]

module.exports = getOrderById;