// const mongoose = require("mongoose");
// const ShippingAddress = require("../../../Models/Address"); 
// const Product = require("../../../Models/Products"); 

// const getShippingAddressesByProductId = async (req, res) => {
//   try {
//     const { productId } = req.params;


//     if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({
//         hasError: true,
//         message: "Valid product ID is required.",
//       });
//     }


//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({
//         hasError: true,
//         message: `Product with ID ${productId} does not exist.`,
//       });
//     }


//     const addresses = await ShippingAddress.find({ productId })
//       .select("-__v") 
//       .lean(); 

//     if (addresses.length === 0) {
//       return res.status(200).json({
//         hasError: false,
//         message: `No shipping addresses found for product ID ${productId}.`,
//         data: [],
//       });
//     }

//     return res.status(200).json({
//       hasError: false,
//       message: `Successfully retrieved ${addresses.length} shipping address(es) for product ID ${productId}.`,
//       data: addresses,
//     });

//   } catch (error) {
//     console.error("Error fetching shipping addresses:", error);

//     return res.status(500).json({
//       hasError: true,
//       message: "Failed to retrieve shipping addresses.",
//       error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
//     });
//   }
// };

// module.exports = getShippingAddressesByProductId;


const mongoose = require("mongoose");
const Address = require("../../../Models/Address");
const User = require("../../../Models/usermode");

const getAddressesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        hasError: true,
        message: "Valid user ID is required.",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        hasError: true,
        message: `User with ID ${userId} does not exist.`,
      });
    }

    const addresses = await Address.find({ userId })
      .select("-__v")
      .lean();

    if (addresses.length === 0) {
      return res.status(200).json({
        hasError: false,
        message: `No addresses found for user ID ${userId}.`,
        data: [],
      });
    }

    return res.status(200).json({
      hasError: false,
      message: `Successfully retrieved ${addresses.length} address(es) for user ID ${userId}.`,
      data: addresses,
    });

  } catch (error) {
    console.error("Error fetching addresses by user ID:", error);

    return res.status(500).json({
      hasError: true,
      message: "Failed to retrieve addresses.",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = getAddressesByUserId;