// const mongoose = require("mongoose");
// const DefaultShippingAddress = require("../../../Models/DefaultShippingAddress");
// const Product = require("../../../Models/Products");
// const Address = require("../../../Models/Address");

// const setDefaultShippingAddress = async (req, res) => {
//   try {
//     const { productId, addressId, isDefault } = req.body;

   
//     if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Valid product ID is required.",
//       });
//     }


//     if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Valid address ID is required.",
//       });
//     }


//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({
//         hasError: true,
//         message: `Product with ID ${productId} does not exist.`,
//       });
//     }


//     const addressExists = await Address.findById(addressId);
//     if (!addressExists) {
//       return res.status(404).json({
//         hasError: true,
//         message: `Address with ID ${addressId} does not exist.`,
//       });
//     }


//     await DefaultShippingAddress.deleteOne({ productId });

//     const newDefaultAddress = new DefaultShippingAddress({
//       productId,
//       addressId,
//       isDefault: isDefault !== undefined ? isDefault : true,
//     });

//     await newDefaultAddress.save();

//     return res.status(201).json({
//       hasError: false,
//       message: "Default shipping address set successfully.",
//       data: newDefaultAddress,
//     });
//   } catch (error) {
//     console.error("Error setting default shipping address:", error);

//     if (error.name === "ValidationError") {
//       const validationErrors = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({
//         hasError: true,
//         message: "Validation failed: " + validationErrors.join(", "),
//       });
//     }

//     return res.status(500).json({
//       hasError: true,
//       message: "Failed to set default shipping address.",
//       error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
//     });
//   }
// };

// module.exports = setDefaultShippingAddress;


const mongoose = require("mongoose");
const DefaultShippingAddress = require("../../../Models/DefaultShippingAddress");
const Product = require("../../../Models/Products");
const Address = require("../../../Models/Address");

const setDefaultShippingAddress = async (req, res) => {
  try {
    const { productId, addressId, isDefault,userId } = req.body;
  

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid product ID is required.",
      });
    }

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid address ID is required.",
      });
    }


    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        hasError: true,
        message: `Product with ID ${productId} does not exist.`,
      });
    }


    const addressExists = await Address.findOne({ 
      _id: addressId, 
      userId: userId 
    });
    if (!addressExists) {
      return res.status(404).json({
        hasError: true,
        message: `Address with ID ${addressId} not found or doesn't belong to you.`,
      });
    }


    const existingAddress = await DefaultShippingAddress.findOne({
      userId,
      productId,
      addressId
    });

    if (existingAddress) {

      if (existingAddress.isDefault === (isDefault !== undefined ? isDefault : true)) {
        return res.status(200).json({
          hasError: false,
          message: "Default shipping address is already set.",
          data: existingAddress,
        });
      }


      existingAddress.isDefault = isDefault !== undefined ? isDefault : true;
      await existingAddress.save();

      return res.status(200).json({
        hasError: false,
        message: "Default shipping address updated successfully.",
        data: existingAddress,
      });
    }

    await DefaultShippingAddress.deleteOne({ userId, productId });

    const newDefaultAddress = new DefaultShippingAddress({
      userId,
      productId,
      addressId,
      isDefault: isDefault !== undefined ? isDefault : true,
    });

    const savedAddress = await newDefaultAddress.save();


    await savedAddress.populate([
      { path: 'productId', select: 'name price' },
      { path: 'addressId', select: 'street city state zipCode' }
    ]);

    return res.status(201).json({
      hasError: false,
      message: "Default shipping address set successfully.",
      data: savedAddress,
    });

  } catch (error) {
    console.error("Error setting default shipping address:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        hasError: true,
        message: "Validation failed: " + validationErrors.join(", "),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "Default shipping address for this product already exists.",
      });
    }

    return res.status(500).json({
      hasError: true,
      message: "Failed to set default shipping address.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
};

module.exports = setDefaultShippingAddress;