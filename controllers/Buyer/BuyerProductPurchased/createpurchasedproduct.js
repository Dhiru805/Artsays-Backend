// const express = require('express');
// const Purchase = require('../../../Models/BuyerProductPurchased'); 
// const Crop = require('../../../Models/CropImage');

// const createPurchase = async (req, res) => {
//   try {
//     const { buyer, product, quantity, paymentMethod } = req.body;

//     const productData = await Crop.findById(product);
//     if (!productData) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const totalPrice = productData.price * quantity;

//     const newPurchase = new Purchase({
//       buyer,
//       product:product|| null,
//       quantity,
//       totalPrice,
//       paymentMethod,
//     });

//     await newPurchase.save();
//     res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = createPurchase ;

const express = require('express');
const Purchase = require('../../../Models/BuyerProductPurchased'); 
const Crop = require('../../../Models/Products');
const BuyerResellProduct = require('../../../Models/BuyerResellProductrequest');
const BuyerRequest = require('../../../Models/Buyercustomrequest');
const mongoose = require('mongoose');

const createPurchase = async (req, res) => {
  try {
    const { buyer, product, resellProduct, customProduct, quantity, paymentMethod } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    let productData;
    let finalPrice;

    if ((product && resellProduct) || (product && customProduct) || (resellProduct && customProduct)) {
      return res.status(400).json({ message: 'Choose only one among product, resellProduct, or customProduct.' });
    }

    if (product) {
      productData = await Crop.findById(product);
      if (!productData) {
        return res.status(404).json({ message: 'Original product not found' });
      }
      if (!productData.finalPrice && !productData.sellingPrice) {
        return res.status(400).json({ message: 'Product price is not defined' });
      }
      finalPrice = (productData.finalPrice || productData.sellingPrice) * quantity;
    } else if (resellProduct) {
      productData = await BuyerResellProduct.findById(resellProduct);
      if (!productData) {
        return res.status(404).json({ message: 'Resell product not found' });
      }

      if (!productData.price) {
        return res.status(400).json({ message: 'Resell product price is not defined' });
      }
      finalPrice = productData.price * quantity;
    } else if (customProduct) {
      productData = await BuyerRequest.findById(customProduct);
      if (!productData) {
        return res.status(404).json({ message: 'Custom product not found' });
      }
      if (typeof productData.MaxBudget !== 'number' || productData.MaxBudget <= 0) {
        return res.status(400).json({ message: 'Custom product price is not defined or invalid' });
      }
      finalPrice = productData.MaxBudget * quantity;
    } else {
      return res.status(400).json({ message: 'Provide either product, resellProduct, or customProduct.' });
    }
    if (isNaN(finalPrice) || finalPrice < 0) {
      return res.status(400).json({ message: 'Invalid final price calculated' });
    }
    const newPurchase = new Purchase({
      buyer,
      product: product || null,
      resellProduct: resellProduct || null,
      customProduct: new mongoose.Types.ObjectId(req.body.customProduct),
      quantity,
      finalPrice,
      paymentMethod,
    });
    await newPurchase.save();
    res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = createPurchase;
