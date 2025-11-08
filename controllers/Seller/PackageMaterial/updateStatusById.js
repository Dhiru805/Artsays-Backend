const mongoose = require("mongoose");
const PackageMaterialSeller = require("../../../Models/packageMaterialSeller");

const updateStatusById = async (req, res) => {
 try {
     const { id } = req.params;
     const { status } = req.body;
 
     // Validate ID
     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({
         success: false,
         message: "Valid order ID is required.",
       });
     }
 
     // Validate status
     if (!status) {
       return res.status(400).json({
         success: false,
         message: "Status field is required.",
       });
     }
 
     // Find and update the order
     const updatedOrder = await PackageMaterialSeller.findByIdAndUpdate(
       id,
       { status },
       { new: true, runValidators: true }
     );
 
     if (!updatedOrder) {
       return res.status(404).json({
         success: false,
         message: "Order not found.",
       });
     }
 
     return res.status(200).json({
       success: true,
       message: "Order status updated successfully.",
       data: updatedOrder,
     });
 
   } catch (error) {
     console.error("Error updating order status:", error);
     return res.status(500).json({
       success: false,
       message: error.message,
     });
   }
};

module.exports = updateStatusById;