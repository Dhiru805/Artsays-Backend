const mongoose = require("mongoose");
const MaterialCard = require("../../../Models/PackagingMaterialSetting/card");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/card");

const updateMaterialCard = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialCard, price } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialCard || typeof materialCard !== "string") {
                errors.push("Valid materialCard required");
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

            const exisitingMaterialCard = await MaterialCard.findById(id).session(session);
            if (!exisitingMaterialCard) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Card not found",
                });
            }

            exisitingMaterialCard.materialCard = materialCard;
            exisitingMaterialCard.price = price;

            if (req.files && req.files.materialCardImage && req.files.materialCardImage[0]) {
                exisitingMaterialCard.materialCardImage = getFilePath(req.files.materialCardImage[0]);
            }

            await exisitingMaterialCard.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Card updated successfully",
                data: exisitingMaterialCard,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material card:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialCard;