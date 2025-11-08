const mongoose = require("mongoose");

const packageMaterialSeller = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    material: { type: mongoose.Schema.Types.ObjectId, ref: "PackageMaterialSchema" },
    stamp: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialStampSchema" },
    stickers: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialStickersSchema" },
    vouchers: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialVouchersSchema" },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialCardSchema" },
    quantity: { type: Number, trim: true, required: true },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number, trim: true, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Work in Progress", "In-Transit", "Ready for Transit", "Delivered"], default: "Pending"}
})

const PackageMaterialSellerSchema = mongoose.model("PackageMaterialSellerSchema", packageMaterialSeller);
module.exports = PackageMaterialSellerSchema;