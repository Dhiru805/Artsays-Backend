const mongoose = require("mongoose");

const GSTSettingSchema = new mongoose.Schema(
    {
        mainCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MainCategory",
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
            min: [0, "Percentage must be non-negative"],
        },
    },
    { timestamps: true }
);

GSTSettingSchema.index(
    { mainCategoryId: 1 },
    { unique: true }
);

module.exports = mongoose.model("GSTSetting", GSTSettingSchema);