const mongoose = require("mongoose");
const MaterialVouchers = require("../../../Models/PackagingMaterialSetting/vouchers");

const deleteMaterialVouchers = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid voucher ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedMaterialVoucher = await MaterialVouchers.findByIdAndDelete(id, { session });

            if (!deletedMaterialVoucher) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material Voucher not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Voucher deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material voucher:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deleteMaterialVouchers;
