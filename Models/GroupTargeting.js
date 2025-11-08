const mongoose = require("mongoose");

const RangeSchema = new mongoose.Schema({
  minRange: {
    type: Number,
    required: true,
    min: [0, "Minimum range must be at least 0"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value) || Number(value.toFixed(2)) === value;
      },
      message: "Minimum range must be an integer or have at most two decimal places",
    },
  },
  maxRange: {
    type: Number,
    required: true,
    validate: [
      {
        validator: function (value) {
          return Number.isInteger(value) || Number(value.toFixed(2)) === value;
        },
        message: "Maximum range must be an integer or have at most two decimal places",
      },
      {
        validator: function (value) {
          return value >= this.minRange;
        },
        message: "Maximum range must be greater than or equal to minimum range",
      },
    ],
  },
});

const GroupTargetingSettingSchema = new mongoose.Schema(
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
 closeMatch: {
      type: RangeSchema,
      required: false, 
    },
    looseMatch: {
      type: RangeSchema,
      required: false,
    },
    substitutes: {
      type: RangeSchema,
      required: false,
    },
    complements: {
      type: RangeSchema,
      required: false,
    },
  },
  { timestamps: true }
);
GroupTargetingSettingSchema.index(
  { mainCategoryId: 1, categoryId: 1, subCategoryId: 1 },
  { unique: true }
);

module.exports = mongoose.model("GroupTargetingSetting", GroupTargetingSettingSchema);