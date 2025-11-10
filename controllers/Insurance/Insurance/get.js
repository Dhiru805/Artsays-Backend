const InsuranceSetting = require("../../../Models/InsuranceSetting");

const getAll = async (req, res) => {
  try {
    const insuranceSettings = await InsuranceSetting.find()
      .populate("mainCategoryId", "mainCategoryName")
      .lean();

    return res.status(200).json({
      hasError: false,
      message: "Insurance settings retrieved successfully.",
      data: insuranceSettings,
    });
  } catch (error) {
    console.error("Error retrieving insurance settings:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve insurance settings.",
      error: error.message,
    });
  }
};

module.exports = getAll;