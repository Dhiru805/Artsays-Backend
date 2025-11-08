const mongoose = require("mongoose");

const stickersSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialStickers: { type: String, trim: true, required: true },
        materialStickersImage: { type: String },
        price: { type: Number, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialStickersSchema = mongoose.model("MaterialStickersSchema", stickersSchema);
module.exports = MaterialStickersSchema;