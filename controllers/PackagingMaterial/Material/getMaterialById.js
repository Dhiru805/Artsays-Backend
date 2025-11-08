const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");

const getPackageMaterialById = [
  async (req, res) => {
    try {
      const { userId, id } = req.params;

      // validate userId and id
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Valid userId is required.",
        });
      }

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Valid material id is required.",
        });
      }

      // find the material
      const packageMaterial = await PackageMaterial.findOne({
        _id: id,
        userId,
      })
        .populate("materialName", "materialName materialNameImage")
        .populate("size", "materialSize")
        .populate("capacity", "materialCapacity")
        .exec();

      if (!packageMaterial) {
        return res.status(404).json({
          success: false,
          message: "Material not found for this user.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Package material fetched successfully",
        data: packageMaterial,
      });
    } catch (error) {
      console.error("Error fetching package material by id:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
];

module.exports = getPackageMaterialById;
