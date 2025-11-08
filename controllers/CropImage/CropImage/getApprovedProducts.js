const Product = require("../../../Models/Products");

const getApprovedProduct = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // ✅ Find all approved products by this user
    const approvedProducts = await Product.find({
      userId,
      status: "Approved",
    }).select(`
      mainImage 
      otherImages 
      productName 
      description 
      mainCategory 
      category 
      subCategory 
      medium 
      materials 
      dimensions 
      weight 
      year 
      editionType 
      framing 
      condition 
      functionalUse 
      handmade 
      surfaceType 
      sellingPrice 
      marketPrice 
      finalPrice 
      discount 
      shippingCharges 
      handlingTime 
      estimatedDelivery 
      packagingType 
      country 
      state 
      city 
      addressLine1 
      addressLine2 
      pincode 
      originRegion 
      periodEra 
      antiqueCondition 
      conservationStatus 
      provenanceHistory 
      culturalSignificance 
      appraisalDetails 
      engravingMarkings 
      isHandmade 
      originalReproduction 
      maintenanceRequired 
      certification 
      createdAt
    `);

    if (!approvedProducts.length) {
      return res.status(404).json({
        message: "No approved products found for this user",
        data: [],
      });
    }

    res.status(200).json({
      message: "Approved products fetched successfully",
      data: approvedProducts,
    });
  } catch (error) {
    console.error("Error fetching approved products:", error);
    res.status(500).json({
      message: "Server error while fetching approved products",
      error: error.message,
    });
  }
};

module.exports = getApprovedProduct;
