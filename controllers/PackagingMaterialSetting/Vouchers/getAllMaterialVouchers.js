const MaterialVouchers = require("../../../Models/PackagingMaterialSetting/vouchers");

const getAllMaterialVouchers = async(req, res) => {
    try {
        const materialVouchers = await MaterialVouchers
        .find()
        .exec();

        res.status(200).json({
        success: true, // Add success flag for consistency
        message: "Material Vouchers fetched succesfully",
        data: materialVouchers
        });
    } catch (error) {
    console.error("Error fetching materialVouchers:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

module.exports = getAllMaterialVouchers;