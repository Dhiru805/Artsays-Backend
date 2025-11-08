const mongoose = require("mongoose");

const materialSizeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialSize: { type: String, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialSize = mongoose.model("MaterialSize", materialSizeSchema);
module.exports = MaterialSize;