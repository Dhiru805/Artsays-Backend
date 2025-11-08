const mongoose = require("mongoose");
const MaterialCapacity = require("../../../Models/PackagingMaterialSetting/capacity");

const createMaterialCapacity = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialCapacity,
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialCapacity || typeof materialCapacity !== "string"){
                errors.push("Valid material capacity required");
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

            const newMaterialCapacity = new MaterialCapacity({
                userId,
                materialCapacity
            });

            newMaterialCapacity.$session(session);
            await newMaterialCapacity.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Capacity Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material capacity:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialCapacity;