const MaterialStickers = require("../../../Models/PackagingMaterialSetting/stickers");

const getAllMaterialStickers = async(req, res) => {
    try {
        const materialStickers = await MaterialStickers
        .find()
        .exec();

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Stickers fetched succesfully",
        data: materialStickers
        });
    } catch (error) {
    console.error("Error fetching materialStickers:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getAllMaterialStickers;