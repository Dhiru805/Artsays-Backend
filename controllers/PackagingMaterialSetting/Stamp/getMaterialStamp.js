const MaterialStamp = require("../../../Models/PackagingMaterialSetting/stamp");

const getMaterialStamp = async(req, res) => {
    try {
        const { userId } = req.params;

        const materialStamp = await MaterialStamp
        .find({ userId })
        .exec();

        if (!materialStamp || materialStamp.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material stamp found for this user",
            });
        }

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Stamp fetched succesfully",
        data: materialStamp,
        });
    } catch (error) {
    console.error("Error fetching materialStamp:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getMaterialStamp;