const MaterialName = require("../../../Models/PackagingMaterialSetting/materialName");

const getMaterialNameImage = async (req, res) => {
  try {
    const { userId, materialName } = req.params;

    if (!userId || !materialName) {
      return res.status(400).json({
        success: false,
        message: "Both userId and materialName are required",
      });
    }

    // Find material by userId and materialName (case-insensitive)
    const material = await MaterialName.findOne({
      userId,
      materialName,
    }).exec();

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    // Return full image URL
    const imageUrl = material.materialNameImage;

    res.status(200).json({
      success: true,
      materialName: material.materialName,
      materialNameImage: imageUrl,
    });
  } catch (err) {
    console.error("Error fetching materialNameImage:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = getMaterialNameImage;
