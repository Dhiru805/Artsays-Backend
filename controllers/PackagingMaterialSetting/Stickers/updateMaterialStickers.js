const mongoose = require("mongoose");
const MaterialStickers = require("../../../Models/PackagingMaterialSetting/stickers");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/stickers");

const updateMaterialStickers = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialStickers, price } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialStickers || typeof materialStickers !== "string") {
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

            const exisitingMaterialStickers = await MaterialStickers.findById(id).session(session);
            if (!exisitingMaterialStickers) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Stickers not found",
                });
            }

            exisitingMaterialStickers.materialStickers = materialStickers;
            exisitingMaterialStickers.price = price;

            if (req.files && req.files.materialStickersImage && req.files.materialStickersImage[0]) {
                exisitingMaterialStickers.materialStickersImage = getFilePath(req.files.materialStickersImage[0]);
            }

            await exisitingMaterialStickers.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Stickers updated successfully",
                data: exisitingMaterialStickers,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material stickers:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialStickers;