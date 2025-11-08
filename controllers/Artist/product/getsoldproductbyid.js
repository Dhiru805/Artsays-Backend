const mongoose = require('mongoose');
const Purchase = require('../../../Models/BuyerProductPurchased');
const BuyerRequest = require('../../../Models/Buyercustomrequest');

const getTotalQuantityPurchased = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        const purchases = await Purchase.aggregate([
            {
                $facet: {
                    products: [
                        { $match: { product: { $ne: null } } },
                        {
                            $group: {
                                _id: "$product",
                                totalQuantity: { $sum: "$quantity" }
                            }
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "_id",
                                foreignField: "_id",
                                as: "productDetails"
                            }
                        },
                        { $unwind: "$productDetails" },
                        {
                            $lookup: {
                                from: "users",
                                localField: "productDetails.userId",
                                foreignField: "_id",
                                as: "userDetails"
                            }
                        },
                        { $unwind: "$userDetails" },
                        {
                            $match: {
                                "userDetails.userType": "Artist",
                                "userDetails._id": userId
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                productId: "$_id",
                                userId: "$userDetails._id",
                                artistName: { $concat: ["$userDetails.name", " ", "$userDetails.lastName"] },
                                productName: "$productDetails.productName",
                                productPrice: "$productDetails.finalPrice",
                                product: "$productDetails.mainImage",
                                totalQuantity: 1
                            }
                        }
                    ],

                    customProducts: [
                        { $match: { customProduct: { $ne: null } } },
                        {
                            $group: {
                                _id: "$customProduct",
                                totalQuantity: { $sum: "$quantity" }
                            }
                        },
                        {
                            $addFields: {
                                customProductId: "$_id"
                            }
                        },
                        {
                            $lookup: {
                                from: "buyerrequests",
                                localField: "customProductId",
                                foreignField: "_id",
                                as: "productDetails"
                            }
                        },
                        { $unwind: "$productDetails" },
                        {
                            $lookup: {
                                from: "users",
                                localField: "productDetails.Artist.id",
                                foreignField: "_id",
                                as: "userDetails"
                            }
                        },
                        { $unwind: "$userDetails" },
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$productDetails._id", "$customProductId"] },
                                        { $eq: ["$userDetails._id", userId] }
                                    ]
                                }
                            }
                        }, {
                            $project: {
                                _id: 0,
                                productId: "$customProductId",
                                userId: "$userDetails._id",
                                artistName: { $concat: ["$userDetails.name", " ", "$userDetails.lastName"] },
                                productName: "$productDetails.ProductName",     
                                productPrice: "$productDetails.MaxBudget",      
                                product: "$productDetails.BuyerImage",
                                totalQuantity: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    purchases: { $concatArrays: ["$products", "$customProducts"] }
                }
            },
            { $unwind: "$purchases" },
            { $replaceRoot: { newRoot: "$purchases" } }
        ]);

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getTotalQuantityPurchased;
