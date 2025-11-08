const MaterialCard = require("../../../Models/PackagingMaterialSetting/card");

const getAllMaterialCard = async(req, res) => {
    try {
        const materialCard = await MaterialCard
        .find()
        .exec();

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Card fetched succesfully",
        data: materialCard
        });
    } catch (error) {
    console.error("Error fetching materialCard:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getAllMaterialCard;