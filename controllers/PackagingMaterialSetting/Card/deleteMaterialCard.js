const mongoose = require("mongoose");
const MaterialCard = require("../../../Models/PackagingMaterialSetting/card");

const deleteMaterialCard = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid card ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedCard = await MaterialCard.findByIdAndDelete(id, { session });

            if (!deletedCard) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material Card not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Card deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material card:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deleteMaterialCard;
