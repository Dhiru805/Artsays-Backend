const GSTSetting = require("../../../Models/GSTSetting");

const getGSTSettings = async (req, res) => {
  try {
    const gstSettings = await GSTSetting.find().populate("mainCategoryId");

    return res.status(200).json({
      hasError: false,
      message: "GST settings fetched successfully.",
      data: gstSettings,
    });
  } catch (error) {
    console.error("Error fetching GST settings:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch GST settings.",
      error: error.message,
    });
  }
};

module.exports = getGSTSettings;