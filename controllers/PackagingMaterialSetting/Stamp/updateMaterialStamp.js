const mongoose = require("mongoose");
const MaterialStamp = require("../../../Models/PackagingMaterialSetting/stamp");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/stamp");

const updateMaterialStamp = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { id } = req.params;
            let { userId, materialStamp, price } = req.body;
            const errors = [];

            console.log("Update request body:", req.body);

            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                errors.push("A valid id is required");
            }

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if (!materialStamp || typeof materialStamp !== "string") {
                errors.push("Valid materialStamp required");
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

            const exisitingMaterialStamp = await MaterialStamp.findById(id).session(session);
            if (!exisitingMaterialStamp) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success: false,
                    message: "Material Stamp not found",
                });
            }

            exisitingMaterialStamp.materialStamp = materialStamp;
            exisitingMaterialStamp.price = price;

            if (req.files && req.files.materialStampImage && req.files.materialStampImage[0]) {
                exisitingMaterialStamp.materialStampImage = getFilePath(req.files.materialStampImage[0]);
            }

            await exisitingMaterialStamp.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success: true,
                message: "Material Stamp updated successfully",
                data: exisitingMaterialStamp,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error updating packaging material stamp:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
]

module.exports = updateMaterialStamp;