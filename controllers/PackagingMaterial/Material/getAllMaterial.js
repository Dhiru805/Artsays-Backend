const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");

const getAllMaterialNames = [
    async (req, res) => {
        try {

            const packageMaterials = await PackageMaterial.find()
                .populate("materialName", "materialName materialNameImage") 
                .populate("size", "materialSize")
                .populate("capacity", "materialCapacity")

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

module.exports = getAllMaterialNames;