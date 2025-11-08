const MaterialStickers = require("../../../Models/PackagingMaterialSetting/stickers");

const getMaterialStickers = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialStickers = await MaterialStickers
        .find({ userId })
        .exec();

        if (!materialStickers || materialStickers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material stickers found for this user",
            });
        }

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

module.exports = getMaterialStickers;