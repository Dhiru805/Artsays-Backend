const mongoose = require("mongoose");
const MaterialStamp = require("../../../Models/PackagingMaterialSetting/stamp");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/stamp");

const createMaterialStamp = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialStamp,
                price,
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialStamp || typeof materialStamp !== "string"){
                errors.push("Valid material stamp required");
            }

            price = Number(price);
            if(!price || typeof price !== "number"){
                errors.push("valid price is required");
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

            const newMaterialStamp = new MaterialStamp({
                userId,
                materialStamp,
                materialStampImage: req.files && req.files.materialStampImage && req.files.materialStampImage[0] ? getFilePath(req.files.materialStampImage[0]) : "",
                price,
            });

            newMaterialStamp.$session(session);
            await newMaterialStamp.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Stamp Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material stamp:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialStamp;