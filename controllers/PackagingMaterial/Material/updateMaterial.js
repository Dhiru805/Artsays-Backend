const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");
const MaterialNameSchema = require("../../../Models/PackagingMaterialSetting/materialName");
const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");
const MaterialCapacitySchema = require("../../../Models/PackagingMaterialSetting/capacity");

const updatePackageMaterial = [
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { id } = req.params;
      let {
        userId,
        materialName,
        size,
        capacity,
        price,
        stockAvailable,
        minimumOrder,
        vendorSupplier,
        ecoFriendly,
        status,
        deliveryEstimation,
      } = req.body;

      const errors = [];

      console.log(req.body);

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Valid material id is required.",
        });
      }

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("A valid user ID is required.");
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      const packageMaterial = await PackageMaterial.findOne({
        _id: id,
        userId,
      }).session(session);
      if (!packageMaterial) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ success: false, message: "Package Material not found." });
      }

      if (materialName) {
        const materialNameDoc = await MaterialNameSchema.findOne({
          materialName,
          userId,
        });
        if (!materialNameDoc) {
          errors.push("Material name not found for this user.");
        } else {
          packageMaterial.materialName = materialNameDoc._id;
        }
      }

      if (size) {
        const sizeDoc = await MaterialSize.findOne({
          materialSize: size,
          userId,
        });
        if (!sizeDoc) {
          errors.push("Material size not found for this user.");
        } else {
          packageMaterial.size = sizeDoc._id;
        }
      }

      if (capacity) {
        const capacityDoc = await MaterialCapacitySchema.findOne({
          materialCapacity: capacity,
          userId,
        });
        if (!capacityDoc) {
          errors.push("Material capacity not found for this user.");
        } else {
          packageMaterial.capacity = capacityDoc._id;
        }
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(400)
          .json({ hasError: true, message: errors.join(" ") });
      }

      if (price !== undefined) packageMaterial.price = price;
      if (stockAvailable !== undefined)
        packageMaterial.stockAvailable = stockAvailable;
      if (minimumOrder !== undefined)
        packageMaterial.minimumOrder = minimumOrder;
      if (vendorSupplier !== undefined)
        packageMaterial.vendorSupplier = vendorSupplier;
      if (deliveryEstimation !== undefined)
        packageMaterial.deliveryEstimation = deliveryEstimation;

      if (ecoFriendly !== undefined) {
        packageMaterial.ecoFriendly =
          ecoFriendly === "true" || ecoFriendly === true;
      }

      if (status && ["Active", "Inactive"].includes(status)) {
        packageMaterial.status = status;
      }

      // Save changes
      await packageMaterial.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        message: "Material Updated Successfully",
        data: packageMaterial,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating packaging material:", error);
      res.status(500).json({ success: false, message: error.message });
      console.error("Error details:", error.message, error.stack);
    }
  },
];

module.exports = updatePackageMaterial;
