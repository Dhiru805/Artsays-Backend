const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialCard: { type: String, trim: true, required: true },
        materialCardImage: { type: String },
        price: { type: Number, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialCardSchema = mongoose.model("MaterialCardSchema", cardSchema);
module.exports = MaterialCardSchema;