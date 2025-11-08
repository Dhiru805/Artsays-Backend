const mongoose = require("mongoose");
const MaterialCapacity = require("../../../Models/PackagingMaterialSetting/capacity");

const deleteMaterialCapacity = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid capacity ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedCapacity = await MaterialCapacity.findByIdAndDelete(id, { session });

            if (!deletedCapacity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material Capacity not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Capacity deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material capacity:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deleteMaterialCapacity;
