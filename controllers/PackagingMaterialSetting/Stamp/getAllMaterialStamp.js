const MaterialStamp = require("../../../Models/PackagingMaterialSetting/stamp");

const getAllMaterialStamp = async(req, res) => {
    try {

        const materialStamp = await MaterialStamp
        .find()
        .exec();

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

module.exports = getAllMaterialStamp;