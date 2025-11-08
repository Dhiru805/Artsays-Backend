const mongoose = require("mongoose");
const MaterialName = require("../../../Models/PackagingMaterialSetting/materialName");
const {
    upload,
    getFilePath
} = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/materialName");

const updateMaterialName = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const {
                id
            } = req.params;
            let {
                userId,
                materialName
            } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialName || typeof materialName !== "string") {
                errors.push("Valid materialName required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const exisitingMaterialName = await MaterialName.findById(id).session(session);
            if (!exisitingMaterialName) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Name not found",
                });
            }

            exisitingMaterialName.materialName = materialName;

            if (req.files && req.files.materialNameImage && req.files.materialNameImage[0]) {
                exisitingMaterialName.materialNameImage = getFilePath(req.files.materialNameImage[0]);
            }

            await exisitingMaterialName.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Name updated successfully",
                data: exisitingMaterialName,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material name:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialName;