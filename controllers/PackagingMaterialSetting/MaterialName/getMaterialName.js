const MaterialName = require("../../../Models/PackagingMaterialSetting/materialName");

const getMaterialName = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialName = await MaterialName
        .find({ userId })
        .exec();

        if (!materialName || materialName.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material names found for this user",
            });
        }

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Name fetched succesfully",
        materialName
        });
        
    } catch (error) {
    console.error("Error fetching materialName:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getMaterialName;