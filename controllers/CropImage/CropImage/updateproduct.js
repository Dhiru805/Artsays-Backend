const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("../../../Models/Products");
const productValidator = require("../../../Validators/Product/productvalidator");
const User = require("../../../Models/usermode");

const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }


        if (req.body.status !== "Drafted") {
            const { error, value } = productValidator.validate(req.body, { abortEarly: false });
            if (error) {
                deleteUploadedFiles(req.files);
                return res.status(400).json({
                    message: "Validation error",
                    details: error.details.map(d => d.message),
                });
            }
            req.body = value;
        }


        const toNumber = (val, fallback = 0) => {
            const n = parseFloat(val);
            return isNaN(n) ? fallback : n;
        };


        const toInt = (val, fallback = 0) => {
            const n = parseInt(val);
            return isNaN(n) ? fallback : n;
        };


        const current = {
            mainImage: existingProduct.mainImage,
            otherImages: existingProduct.otherImages || [],
            certificateFile: existingProduct.certificateFile,
            coaFile: existingProduct.coaFile,
            restorationDocumentation: existingProduct.restorationDocumentation,
            certification: existingProduct.certification,
        };


        const filesToDelete = [];

        const productData = {
            ...req.body,


            userId: req.body.userId || existingProduct.userId,
            mainCategory: req.body.mainCategory || existingProduct.mainCategory,
            category: req.body.category || existingProduct.category,
            subCategory: req.body.subCategory || existingProduct.subCategory,
            productType: req.body.productType || existingProduct.productType || [],
            editionNumber: req.body.productType === "Limited Edition"
                ? toInt(req.body.editionNumber, existingProduct.editionNumber)
                : existingProduct.editionNumber,


            dimensions: {
                width: toNumber(req.body.width, existingProduct.dimensions?.width || 0),
                height: toNumber(req.body.height, existingProduct.dimensions?.height || 0),
                depth: toNumber(req.body.depth, existingProduct.dimensions?.depth || 0),
            },
            weight: toNumber(req.body.weight, existingProduct.weight || 0),


            framing: req.body.framing || existingProduct.framing,
            functionalUse: req.body.functionalUse || existingProduct.functionalUse,
            handmade: req.body.handmade || existingProduct.handmade,
            condition: req.body.condition || existingProduct.condition,
            returnPolicy: req.body.returnPolicy || existingProduct.returnPolicy,
            copyrightRights: req.body.copyrightRights || existingProduct.copyrightRights,
            commercialUse: req.body.commercialUse || existingProduct.commercialUse,


            editionSize: (() => {
                const partOfCollection = req.body.partOfCollection === true || req.body.partOfCollection === 'true';
                if (!partOfCollection) return 1;
                const size = toInt(req.body.editionSize, existingProduct.editionSize || 1);
                return size >= 1 ? size : 1;
            })(),


            mainImage: req.files?.images?.[0]
                ? `/uploads/productImage/${req.files.images[0].filename}`
                : current.mainImage,
            // otherImages: req.files?.images?.slice(1).length > 0
            //     ? req.files.images.slice(1).map(f => `/uploads/productImage/${f.filename}`)
            //     : current.otherImages,

            // Merge new uploaded images with existing ones
            otherImages: (() => {
                const newImgs = req.files?.images?.slice(1).map(f => `/uploads/productImage/${f.filename}`) || [];
                const existingImgs = Array.isArray(req.body.existingImages)
                    ? req.body.existingImages
                    : current.otherImages;


                const merged = [...existingImgs, ...newImgs].slice(0, 8);
                return merged;
            })(),



            certificateFile: req.files?.certificateFile?.[0]
                ? `/uploads/certificates/${req.files.certificateFile[0].filename}`
                : current.certificateFile,
            coaFile: req.files?.coaFile?.[0]
                ? `/uploads/coa/${req.files.coaFile[0].filename}`
                : current.coaFile,
            restorationDocumentation: req.files?.restorationDocumentation?.[0]
                ? `/uploads/restorationDocumentation/${req.files.restorationDocumentation[0].filename}`
                : current.restorationDocumentation,
            certification: req.files?.certification?.[0]
                ? `/uploads/certification/${req.files.certification[0].filename}`
                : current.certification,


            sellingPrice: req.body.sellingPrice !== undefined
                ? toNumber(req.body.sellingPrice)
                : existingProduct.sellingPrice,
            marketPrice: req.body.marketPrice !== undefined
                ? toNumber(req.body.marketPrice)
                : existingProduct.marketPrice,
            discount: req.body.discount !== undefined
                ? toNumber(req.body.discount, 0)
                : existingProduct.discount || 0,
            finalPrice: null,


            shippingCharges: req.body.shippingCharges !== undefined
                ? toNumber(req.body.shippingCharges, 0)
                : existingProduct.shippingCharges || 0,
            insuranceCoverage: req.body.insuranceCoverage !== undefined
                ? req.body.insuranceCoverage === true || req.body.insuranceCoverage === 'true'
                : existingProduct.insuranceCoverage,
            selfShipping: req.body.selfShipping !== undefined
                ? req.body.selfShipping === true || req.body.selfShipping === 'true'
                : existingProduct.selfShipping,


            giftWrapping: req.body.giftWrapping !== undefined
                ? req.body.giftWrapping === true || req.body.giftWrapping === 'true'
                : existingProduct.giftWrapping,
            giftWrappingCost: req.body.giftWrappingCost !== undefined
                ? req.body.giftWrappingCost === true || req.body.giftWrappingCost === 'true'
                : existingProduct.giftWrappingCost,
            giftWrappingCostAmount: req.body.giftWrappingCostAmount !== undefined
                ? toNumber(req.body.giftWrappingCostAmount, 0)
                : existingProduct.giftWrappingCostAmount || 0,


            ownershipConfirmation: req.body.ownershipConfirmation !== undefined
                ? req.body.ownershipConfirmation === true || req.body.ownershipConfirmation === 'true'
                : existingProduct.ownershipConfirmation,

            artistSignature: req.body.artistSignature !== undefined
                ? req.body.artistSignature === true || req.body.artistSignature === 'true'
                : existingProduct.artistSignature,

            coaAvailable: req.body.coaAvailable !== undefined
                ? req.body.coaAvailable === true || req.body.coaAvailable === 'true'
                : existingProduct.coaAvailable,

            prohibitedItems: req.body.prohibitedItems !== undefined
                ? req.body.prohibitedItems === true || req.body.prohibitedItems === 'true'
                : existingProduct.prohibitedItems,


            partOfCollection: req.body.partOfCollection !== undefined
                ? req.body.partOfCollection === true || req.body.partOfCollection === 'true'
                : existingProduct.partOfCollection,
            collectionName: req.body.partOfCollection === true || req.body.partOfCollection === 'true'
                ? req.body.collectionName
                : existingProduct.collectionName,
            ipfsStorage: req.body.ipfsStorage !== undefined
                ? req.body.ipfsStorage === true || req.body.ipfsStorage === 'true'
                : existingProduct.ipfsStorage,
            unlockableContent: req.body.unlockableContent !== undefined
                ? req.body.unlockableContent === true || req.body.unlockableContent === 'true'
                : existingProduct.unlockableContent,


            addressLine1: req.body.addressLine1 !== undefined ? req.body.addressLine1 : existingProduct.addressLine1,
            addressLine2: req.body.addressLine2 !== undefined ? req.body.addressLine2 : existingProduct.addressLine2,
            landmark: req.body.landmark !== undefined ? req.body.landmark : existingProduct.landmark,
            city: req.body.city !== undefined ? req.body.city : existingProduct.city,
            state: req.body.state !== undefined ? req.body.state : existingProduct.state,
            country: req.body.country !== undefined ? req.body.country : existingProduct.country,
            pincode: req.body.pincode !== undefined ? req.body.pincode : existingProduct.pincode,
        };


        if (productData.coaAvailable) {
            productData.certificateType = req.body.certificateType || existingProduct.certificateType;
            productData.issuerName = req.body.issuerName || existingProduct.issuerName;
            productData.verificationNumber = req.body.verificationNumber || existingProduct.verificationNumber;
            productData.certificateFormat = req.body.certificateFormat || existingProduct.certificateFormat || 'digital';
        } else {

            productData.certificateType = undefined;
            productData.issuerName = undefined;
            productData.verificationNumber = undefined;
            productData.certificateFormat = undefined;
        }


        if (productData.sellingPrice > 0) {
            const discount = productData.discount || 0;
            productData.finalPrice = Math.round(productData.sellingPrice * (1 - discount / 100) * 100) / 100;
        } else {
            productData.finalPrice = existingProduct.finalPrice;
        }


        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: productData },
            { new: true, runValidators: true }
        );


        if (req.files?.images?.[0] && current.mainImage) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.mainImage));
        }
        if (req.files?.images?.[0] && current.mainImage && !req.body.existingImages?.includes(current.mainImage)) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.mainImage));
        }
        if (req.files?.certificateFile?.[0] && current.certificateFile) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.certificateFile));
        }
        if (req.files?.coaFile?.[0] && current.coaFile) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.coaFile));
        }
        if (req.files?.restorationDocumentation?.[0] && current.restorationDocumentation) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.restorationDocumentation));
        }
        if (req.files?.certification?.[0] && current.certification) {
            filesToDelete.push(path.join(__dirname, '../../../../', current.certification));
        }


        filesToDelete.forEach(filePath => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        res.status(200).json({
            message: req.body.status === "Drafted" ? "Product draft updated successfully" : "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        console.error("Error updating product:", error);
        deleteUploadedFiles(req.files);

        // if (error.code === 11000) {
        //     return res.status(400).json({
        //         message: "Duplicate token ID",
        //         details: ["This token ID already exists"],
        //     });
        // }

        res.status(500).json({
            message: "Error while updating product",
            error: error.message,
        });
    }
};


function deleteUploadedFiles(files) {
    if (!files) return;
    Object.values(files).flat().forEach(file => {
        const filePath = file.path;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
}

module.exports = updateProduct;