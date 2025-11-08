const BuyerRequest = require("../../../Models/Buyercustomrequest");

// Update order status API
const updateorderstatus = async (req, res) => {
  try {
    console.log("📩 API Hit: /updateorderstatus");
    console.log("➡️ Params:", req.params);
    console.log("➡️ Body:", req.body);

    const { orderId } = req.params;
    const { status, reason, comment } = req.body; 

    // validate status
    const allowedStatuses = [
      "Ordered",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      console.log("❌ Invalid Status Received:", status);
      return res.status(400).json({ message: "Invalid status value" });
    }

    // find the order by orderId
    const order = await BuyerRequest.findOne({ orderId });

    if (!order) {
      console.log("❌ Order not found for ID:", orderId);
      return res.status(404).json({ message: "Order not found" });
    }

    // if already cancelled or delivered, prevent update
    if (order.OrderStatus === "Cancelled") {
      console.log("⚠️ Order already cancelled:", orderId);
      return res.status(400).json({ message: "Order is already cancelled" });
    }
    if (order.OrderStatus === "Delivered" && status === "Cancelled") {
      console.log("⚠️ Cannot cancel delivered order:", orderId);
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
    }

    // ✅ update current status
    order.OrderStatus = status;

    // ✅ push status history (if you have StatusHistory array)
    if (!order.StatusHistory) order.StatusHistory = [];
    order.StatusHistory.push({ status, timestamp: new Date() });

    // ✅ if cancelled, store reason and comment
    if (status === "Cancelled") {
      order.CancelReason = reason || "";
      order.CancelComment = comment || "";
      console.log("📝 Cancellation Data Saved:", { reason, comment });
    }

    // save updated order
    await order.save();

    console.log("✅ Order updated successfully:", orderId);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = updateorderstatus;
