const mongoose = require("mongoose");
const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");

const updateMaterialSize = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialSize } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialSize || typeof materialSize !== "string") {
                errors.push("Valid materialSize required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const exisitingMaterialSize = await MaterialSize.findById(id).session(session);
            if (!exisitingMaterialSize) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Size not found",
                });
            }

            exisitingMaterialSize.materialSize = materialSize;

            await exisitingMaterialSize.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Size updated successfully",
                data: exisitingMaterialSize,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material size:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialSize;