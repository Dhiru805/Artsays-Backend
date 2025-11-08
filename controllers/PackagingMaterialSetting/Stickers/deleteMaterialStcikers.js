const mongoose = require("mongoose");
const MaterialStickers = require("../../../Models/PackagingMaterialSetting/stickers");

const deleteMaterialStickers = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid sticker ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedMaterialSticker = await MaterialStickers.findByIdAndDelete(id, { session });

            if (!deletedMaterialSticker) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material Sticker not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Sticker deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material sticker:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deleteMaterialStickers;
