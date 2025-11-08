const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");

const getMaterialSize = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialSize = await MaterialSize
        .find({ userId })
        .exec();

        if (!materialSize || materialSize.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material size found for this user",
            });
        }

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Size fetched succesfully",
        materialSize
        });
    } catch (error) {
    console.error("Error fetching materialSize:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getMaterialSize