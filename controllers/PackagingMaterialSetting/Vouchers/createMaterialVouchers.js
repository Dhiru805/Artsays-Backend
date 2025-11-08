const mongoose = require("mongoose");
const MaterialVouchers = require("../../../Models/PackagingMaterialSetting/vouchers");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/PackagingMaterialSetting/vouchers");

const createMaterialVouchers = [
    upload,
    async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let {
                userId,
                materialVouchers,
                price,
            } = req.body;
            const errors = [];

            console.log(req.body);

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                errors.push("A valid user ID is required.");
            }

            if(!materialVouchers || typeof materialVouchers !== "string"){
                errors.push("Valid material vouchers required");
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

            const newMaterialVouchers = new MaterialVouchers({
                userId,
                materialVouchers,
                materialVouchersImage: req.files && req.files.materialVouchersImage && req.files.materialVouchersImage[0] ? getFilePath(req.files.materialVouchersImage[0]) : "",
                price,
            });

            newMaterialVouchers.$session(session);
            await newMaterialVouchers.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "Material Vouchers Created Successfully",
            });
        } catch(error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating packaging material vouchers:", error);
            res.status(500).json({ success: false, message: error.message });
            console.error("Error details:", error.message, error.stack);
        }
    },
];

module.exports = createMaterialVouchers;