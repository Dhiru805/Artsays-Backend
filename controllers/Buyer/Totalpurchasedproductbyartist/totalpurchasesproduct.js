const Purchase = require('../../../Models/BuyerProductPurchased');

const getTotalQuantityPurchased = async (req, res) => {
  try {
    const normalProducts = await Purchase.aggregate([
      {
        $match: { product: { $ne: null } }
      },
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
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "productDetails.userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "userDetails.userType": "Artist"
        }
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          artistName: {
            $cond: {
              if: { $eq: ["$userDetails", {}] },
              then: "Unknown Artist",
              else: { $concat: ["$userDetails.name", " ", "$userDetails.lastName"] }
            }
          },
          productName: "$productDetails.productName",
          productPrice: "$productDetails.finalPrice",
          product: "$productDetails.mainImage",
          totalQuantity: 1
        }
      }
    ]);

    const customProducts = await Purchase.aggregate([
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
        $match: { "userDetails.userType": "Artist" }
      },
      {
        $project: {
          _id: 0,
          productId: "$customProductId",
          artistName: { $concat: ["$userDetails.name", " ", "$userDetails.lastName"] },
          productName: "$productDetails.ProductName",
          productPrice: "$productDetails.MaxBudget",
          product: "$productDetails.BuyerImage",
          totalQuantity: 1
        }
      }
    ]);

    const combinedResults = [...normalProducts, ...customProducts];

    if (!combinedResults.length) {
      return res.status(200).json({ message: "No purchase data found for products by artists." });
    }

    res.status(200).json(combinedResults);
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getTotalQuantityPurchased;
