const mongoose = require("mongoose");
const PackageMaterialArtist = require("../../../Models/packagematerialartist");

const deleteOrder = [
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { id } = req.params;

      const errors = [];

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        errors.push("A valid order ID is required.");
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      const deletedOrder = await PackageMaterialArtist.findByIdAndDelete(id, { session });

      if (!deletedOrder) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          hasError: true,
          message: "Order ID not found",
        });
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        success: true,
        message: "Order ID deleted successfully",
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error deleting order id:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
];

module.exports = deleteOrder;
