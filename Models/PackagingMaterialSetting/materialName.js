const mongoose = require("mongoose");

const materialNameSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialName: { type: String, trim: true, required: true },
        materialNameImage: { type: String }
    },
    { timestamps: true }
)

const MaterialNameSchema = mongoose.model("MaterialNameSchema", materialNameSchema);
module.exports = MaterialNameSchema;