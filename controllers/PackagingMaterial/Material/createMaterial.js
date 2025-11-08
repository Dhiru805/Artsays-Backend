const mongoose = require("mongoose");
const PackageMaterial = require("../../../Models/packageMaterial");
const MaterialNameSchema = require("../../../Models/PackagingMaterialSetting/materialName");
const MaterialSize = require("../../../Models/PackagingMaterialSetting/materialSize");
const MaterialCapacitySchema = require("../../../Models/PackagingMaterialSetting/capacity");

const createPackageMaterial = [
    async (req, res) => {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
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
                    deliveryEstimation
                } = req.body;

                const errors = [];
    
                console.log(req.body);
    
                if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
                    errors.push("A valid user ID is required.");
                }
    
                if(!materialName || typeof materialName !== "string"){
                    errors.push("Valid materialName required");
                }

                if(!size || typeof size !== "string"){
                    errors.push("Valid size required");
                }

                 if(!capacity || typeof capacity !== "string"){
                    errors.push("Valid capacity required");
                }

                price = Number(price);
                 if(!price || typeof price !== "number"){
                    errors.push("Valid price required");
                }

                 if(!stockAvailable || typeof stockAvailable !== "string"){
                    errors.push("Valid stockAvailable required");
                }

                 if(!minimumOrder || typeof minimumOrder !== "string"){
                    errors.push("Valid minimumOrder required");
                }

                 if(!vendorSupplier || typeof vendorSupplier !== "string"){
                    errors.push("Valid vendorSupplier required");
                }

                 if(!deliveryEstimation || typeof deliveryEstimation !== "string"){
                    errors.push("Valid deliveryEstimation required");
                }

                if (ecoFriendly !== "Yes" && ecoFriendly !== "No" && typeof ecoFriendly !== "boolean") {
                    errors.push("ecoFriendly must be Yes/No (true/false).");
                }

                if (!["Active", "Inactive"].includes(status)) {
                    errors.push("status must be Active or Inactive.");
                }
    
                console.log(errors);
    
                // Find the ObjectIds for the referenced fields
                const materialNameDoc = await MaterialNameSchema.findOne({ materialName, userId });
                if (!materialNameDoc) {
                    errors.push("Material name not found for this user.");
                }

                const sizeDoc = await MaterialSize.findOne({ materialSize: size, userId });
                if (!sizeDoc) {
                    errors.push("Material size not found for this user.");
                }

                const capacityDoc = await MaterialCapacitySchema.findOne({ materialCapacity: parseInt(capacity), userId });
                if (!capacityDoc) {
                    errors.push("Material capacity not found for this user.");
                }

                if (errors.length > 0) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(400).json({
                        hasError: true,
                        message: errors.join(" "),
                    });
                }

                ecoFriendly = ecoFriendly === "true" || ecoFriendly === true;
    
                const newPackageMaterial = new PackageMaterial({
                    userId,
                    materialName: materialNameDoc._id,
                    size: sizeDoc._id,
                    capacity: capacityDoc._id,
                    price,
                    stockAvailable,
                    minimumOrder,
                    vendorSupplier,
                    ecoFriendly,
                    status,
                    deliveryEstimation
                });
    
                newPackageMaterial.$session(session);
                await newPackageMaterial.save({ session });
    
                await session.commitTransaction();
                session.endSession();
    
                res.status(201).json({
                    success: true,
                    message: "Material Created Successfully",
                    data: newPackageMaterial
                });
            } catch(error) {
                await session.abortTransaction();
                session.endSession();
                console.error("Error creating packaging material:", error);
                res.status(500).json({ success: false, message: error.message });
                console.error("Error details:", error.message, error.stack);
            }
        }
]

module.exports = createPackageMaterial;