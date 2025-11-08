const MaterialVouchers = require("../../../Models/PackagingMaterialSetting/vouchers");

const getMaterialVouchers = async(req, res) => {
    try {
        const { userId } = req.params;
        const materialVouchers = await MaterialVouchers
        .find({ userId })
        .exec();

        if (!materialVouchers || materialVouchers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No material vouchers found for this user",
            });
        }

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

module.exports = getMaterialVouchers;