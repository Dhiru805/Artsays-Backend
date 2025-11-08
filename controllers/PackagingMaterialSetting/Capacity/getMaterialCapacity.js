const MaterialCapacity = require("../../../Models/PackagingMaterialSetting/capacity");

const getMaterialCapacity = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialCapacity = await MaterialCapacity
        .find({ userId })
        .exec();

        if (!materialCapacity || materialCapacity.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material capacity found for this user",
            });
        }

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material capacity fetched succesfully",
        materialCapacity
        });
    } catch (error) {
    console.error("Error fetching materialCapacity:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getMaterialCapacity;