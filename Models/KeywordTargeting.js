const mongoose = require("mongoose");

const RangeSchema = new mongoose.Schema({
  range: {
    type: Number,
    required: true,
    min: [0, "Range must be at least 0"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value) || Number(value.toFixed(2)) === value;
      },
      message: "Range must be an integer or have at most two decimal places",
    },
  },
});

const KeywordTargetingSettingSchema = new mongoose.Schema(
  {
    mainCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    keyword: {
      type: String,
      required: true,
      trim: true,
    },
    broad: RangeSchema,
    phrase: RangeSchema,
    exact: RangeSchema,
  },
  { timestamps: true }
);

KeywordTargetingSettingSchema.index(
  { mainCategoryId: 1, categoryId: 1, subCategoryId: 1, keyword: 1 },
  { unique: true }
);

module.exports = mongoose.model("KeywordTargetingSetting", KeywordTargetingSettingSchema);