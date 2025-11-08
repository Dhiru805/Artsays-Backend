const Notification = require("../../../Models/SocialMedia/notificationSchema");

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params; // notification ID from route

    const deleted = await Notification.findByIdAndDelete(notificationId);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = { deleteNotification };
