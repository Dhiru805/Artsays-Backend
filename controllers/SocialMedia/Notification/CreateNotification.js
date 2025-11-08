const Notification = require("../../../Models/SocialMedia/notificationSchema");

const CreateNotification = async (req, res) => {
  try {
    const { to, type, post, message } = req.body;
    const from = req.user._id; // assuming you set req.user from auth middleware

    if (!to || !type) {
      return res.status(400).json({ message: "to and type are required" });
    }

    const notification = new Notification({
      from,
      to,
      type,
      post,
      message,
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { CreateNotification };
