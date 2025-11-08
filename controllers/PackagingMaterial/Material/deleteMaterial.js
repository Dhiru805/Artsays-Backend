const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");

const deletePackageMaterial = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params; 
            const errors = [];

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid material ID is required.");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const deletedPackageMaterial = await PackageMaterial.findByIdAndDelete(id, { session });

            if (!deletedPackageMaterial) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    hasError: true,
                    message: "Material ID not found",
                });
            }

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material ID deleted successfully",
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error deleting material id:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
];

module.exports = deletePackageMaterial;
