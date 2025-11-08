const MaterialCard = require("../../../Models/PackagingMaterialSetting/card");

const getMaterialCard = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialCard = await MaterialCard
        .find({ userId })
        .exec();

        if (!materialCard || materialCard.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material card found for this user",
            });
        }

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

module.exports = getMaterialCard;