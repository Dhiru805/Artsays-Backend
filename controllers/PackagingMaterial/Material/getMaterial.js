const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");

const getPackageMaterial = [
    async (req, res) => {
        try {
            const { userId } = req.params;

            if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                success: false,
                message: "Valid userId is required.",
                });
            }

            const packageMaterials = await PackageMaterial.find({ userId })
                .populate("materialName", "materialName materialNameImage") 
                .populate("size", "materialSize")
                .populate("capacity", "materialCapacity")
                .exec();

                if (!packageMaterials || packageMaterials.length === 0) {
                    return res.status(404).json({
                    success: false,
                    message: "No materials found for this user.",
                });
            }
            res.status(200).json({
            success: true,
            message: "Package materials fetched successfully",
            data: packageMaterials,
            });
        } catch (error) {
            console.error("Error fetching package materials:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
]

module.exports = getPackageMaterial;