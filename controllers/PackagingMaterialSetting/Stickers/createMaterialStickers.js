const mongoose = require("mongoose");
const MaterialStickers = require("../../../Models/PackagingMaterialSetting/stickers");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/stickers");

const createMaterialStickers = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialStickers,
                price,
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialStickers || typeof materialStickers !== "string"){
                errors.push("Valid material stickers required");
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

            const newMaterialStickers = new MaterialStickers({
                userId,
                materialStickers,
                materialStickersImage: req.files && req.files.materialStickersImage && req.files.materialStickersImage[0] ? getFilePath(req.files.materialStickersImage[0]) : "",
                price,
            });

            newMaterialStickers.$session(session);
            await newMaterialStickers.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Stickers Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material stickers:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialStickers;