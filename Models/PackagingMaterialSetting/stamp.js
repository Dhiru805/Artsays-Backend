const mongoose = require("mongoose");

const stampSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialStamp: { type: String, trim: true, required: true },
        materialStampImage: { type: String },
        price: { type: Number, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialStampSchema = mongoose.model("MaterialStampSchema", stampSchema);
module.exports = MaterialStampSchema;