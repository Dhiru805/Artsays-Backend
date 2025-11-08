const mongoose = require("mongoose");

const packageMaterialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialName: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialNameSchema", required: true },
    size: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialSize", required: true },
    capacity: { type: mongoose.Schema.Types.ObjectId, ref: "MaterialCapacitySchema", required: true },
    price: { type: Number, trim: true, required: true },
    stockAvailable : { type: String, trim: true, required: true },
    minimumOrder: { type: String, trim: true, required: true },
    vendorSupplier: { type: String, trim: true, required: true },
    ecoFriendly: {type: Boolean, required: true },
    status: { type: String, enum:["Active", "Inactive"], default: "Active", required: true },
    deliveryEstimation: { type: String, trim: true, required: true },
})

const PackageMaterialSchema = mongoose.model("PackageMaterialSchema", packageMaterialSchema);
module.exports = PackageMaterialSchema;