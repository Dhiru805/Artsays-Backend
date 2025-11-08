const mongoose = require("mongoose");
const MaterialCapacity = require("../../../Models/PackagingMaterialSetting/capacity");

const updateMaterialCapacity = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialCapacity } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialCapacity || typeof materialCapacity !== "string") {
                errors.push("Valid materialCapacity required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const exisitingMaterialCapacity = await MaterialCapacity.findById(id).session(session);
            if (!exisitingMaterialCapacity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Capacity not found",
                });
            }

            exisitingMaterialCapacity.materialCapacity = materialCapacity;

            await exisitingMaterialCapacity.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Capacity updated successfully",
                data: exisitingMaterialCapacity,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material capacity:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialCapacity;