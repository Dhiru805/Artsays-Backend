const mongoose = require("mongoose");
const PackageMaterialArtist = require("../../../Models/packagematerialartist");
const User = require("../../../Models/usermode");

const createOrder = [
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                material,
                stamp,
                stickers,
                vouchers,
                card,
                quantity,
                deliveryAddress,
                totalPrice,
                status
            } = req.body;

            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            quantity = Number(quantity);
            if(!quantity || isNaN(quantity) || quantity <= 0){
                errors.push("Valid quantity required");
            }

            totalPrice = Number(totalPrice);
            if(!totalPrice || isNaN(totalPrice) || totalPrice <= 0){
                errors.push("Valid totalPrice required");
            }

            if (errors.length > 0) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    hasError: true,
                    message: errors.join(" "),
                });
            }

            const addressDoc = await User.findById(userId); // OR findOne({ userId })

            if (!addressDoc) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ success: false, message: "User not found." });
            }

            const newOrder = new PackageMaterialArtist({
                userId,
                material,
                stamp,
                stickers,
                vouchers,
                card,
                quantity,
                deliveryAddress: userId,
                totalPrice,
            });

            newOrder.$session(session);
            await newOrder.save({ session });
    
            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Order Created Successfully",
                data: newOrder
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating order:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    }
]

module.exports = createOrder;