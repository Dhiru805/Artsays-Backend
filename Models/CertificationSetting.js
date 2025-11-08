const mongoose = require("mongoose");

const CertificationSettingSchema = new mongoose.Schema(
    {
        certificationName: {
            type: String,
            required: true,
            trim: true,
        },
        mainCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MainCategory",
            required: true,
        },
        estimatedDays: {
            type: Number,
            required: true,
            min: [1, "Estimated days must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Estimated days must be an integer",
            },
        },
    },
    { timestamps: true }
);

CertificationSettingSchema.index(
    { certificationName: 1, mainCategoryId: 1 },
    { unique: true }
);

module.exports = mongoose.model("CertificationSetting", CertificationSettingSchema);