const mongoose = require("mongoose");
const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");

const createMaterialSize = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialSize,
            } = req.body;

            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialSize || typeof materialSize !== "string"){
                errors.push("Valid material Size required");
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

            const newMaterialSize = new MaterialSize({
                userId,
                materialSize
            });

            newMaterialSize.$session(session);
            await newMaterialSize.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Size Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material size:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialSize;