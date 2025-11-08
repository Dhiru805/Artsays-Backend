const mongoose = require("mongoose");
const MaterialCard = require("../../../Models/PackagingMaterialSetting/card");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/card");

const createMaterialCard = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialCard,
                price
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialCard || typeof materialCard !== "string"){
                errors.push("Valid material Card required");
            }

            price = Number(price);
            if(!price || typeof price !== "number") {
                errors.push("Valid price is required");
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

            const newMaterialCard = new MaterialCard({
                userId,
                materialCard,
                materialCardImage: req.files && req.files.materialCardImage && req.files.materialCardImage[0] ? getFilePath(req.files.materialCardImage[0]) : "",
                price
            });

            newMaterialCard.$session(session);
            await newMaterialCard.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Card Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material card:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialCard;