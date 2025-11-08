const mongoose = require("mongoose");
const MaterialName = require("../../../Models/PackagingMaterialSetting/materialName");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/materialName");

const createMaterialName = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialName,
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialName || typeof materialName !== "string"){
                errors.push("Valid materialName required");
            }

            console.log(errors);

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                hasError: true,
                message: errors.join(" "),
                });
            }

            const newMaterialName = new MaterialName({
                userId,
                materialName,
                materialNameImage: req.files && req.files.materialNameImage && req.files.materialNameImage[0] ? getFilePath(req.files.materialNameImage[0]) : "",
            });

            newMaterialName.$session(session);
            await newMaterialName.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Name Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material name:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialName;