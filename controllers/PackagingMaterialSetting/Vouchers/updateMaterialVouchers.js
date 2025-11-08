const mongoose = require("mongoose");
const MaterialVouchers = require("../../../Models/PackagingMaterialSetting/vouchers");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/vouchers");

const updateMaterialVouchers = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialVouchers, price } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialVouchers || typeof materialVouchers !== "string") {
                errors.push("Valid materialStickers required");
            }

            price = Number(price);
            if(!price || typeof price !== "number") {
                errors.push("Valid price is required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const exisitingMaterialVouchers = await MaterialVouchers.findById(id).session(session);
            if (!exisitingMaterialVouchers) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Vouchers not found",
                });
            }

            exisitingMaterialVouchers.materialVouchers = materialVouchers;
            exisitingMaterialVouchers.price = price;

            if (req.files && req.files.materialVouchersImage && req.files.materialVouchersImage[0]) {
                exisitingMaterialVouchers.materialVouchersImage = getFilePath(req.files.materialVouchersImage[0]);
            }

            await exisitingMaterialVouchers.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Vouchers updated successfully",
                data: exisitingMaterialVouchers,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material vouchers:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialVouchers;