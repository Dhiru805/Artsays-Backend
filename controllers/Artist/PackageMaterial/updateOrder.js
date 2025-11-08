const mongoose = require("mongoose");
const PackageMaterialArtist = require("../../../Models/packagematerialartist");
const User = require("../../../Models/usermode");

const updateOrder = [
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params; 
      let {
        userId,
        material,
        stamp,
        stickers,
        vouchers,
        card,
        quantity,
        deliveryAddress,
        totalPrice,
        status
      } = req.body;

      const errors = [];

      console.log(req.body);

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Valid material id is required.",
        });
      }

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("A valid user ID is required.");
      }

      quantity = Number(quantity);
      if (!quantity || isNaN(quantity) || quantity <= 0) {
        errors.push("Valid quantity required.");
      }

      totalPrice = Number(totalPrice);
      if (!totalPrice || isNaN(totalPrice) || totalPrice <= 0) {
        errors.push("Valid totalPrice required.");
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      // Check if order exists
      const existingOrder = await PackageMaterialArtist.findOne({
        _id: id,
        userId
      }).session(session);
      if (!existingOrder) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }

      // Check if user exists
      const userDoc = await User.findById(userId);
      if (!userDoc) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Update fields
      existingOrder.userId = userId;
      existingOrder.material = material || existingOrder.material;
      existingOrder.stamp = stamp || existingOrder.stamp;
      existingOrder.stickers = stickers || existingOrder.stickers;
      existingOrder.vouchers = vouchers || existingOrder.vouchers;
      existingOrder.card = card || existingOrder.card;
      existingOrder.quantity = quantity;
      existingOrder.deliveryAddress =  userDoc._id;
      existingOrder.totalPrice = totalPrice;
      existingOrder.status = status;

      await existingOrder.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Order updated successfully.",
        data: existingOrder,
      });

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating order:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

module.exports = updateOrder;
