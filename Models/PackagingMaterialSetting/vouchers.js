const mongoose = require("mongoose");

const vouchersSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialVouchers: { type: String, trim: true, required: true },
        materialVouchersImage: { type: String },
        price: { type: Number, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialVouchersSchema = mongoose.model("MaterialVouchersSchema", vouchersSchema);
module.exports = MaterialVouchersSchema;