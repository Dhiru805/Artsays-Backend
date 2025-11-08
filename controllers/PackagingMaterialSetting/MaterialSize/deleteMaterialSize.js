const mongoose = require("mongoose");
const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");

const deleteMaterialSize = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid materialSize ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedMaterialSize = await MaterialSize.findByIdAndDelete(id, { session });

            if (!deletedMaterialSize) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material Size not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Size deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material size:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deleteMaterialSize;
