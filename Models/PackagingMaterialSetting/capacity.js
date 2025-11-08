const mongoose = require("mongoose");

const capacitySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        materialCapacity: { type: String, trim: true, required: true },
    },
    { timestamps: true }
)

const MaterialCapacitySchema = mongoose.model("MaterialCapacitySchema", capacitySchema);
module.exports = MaterialCapacitySchema;