// controllers/tips/CreateTip.js
const Tip = require("../../../../Models/tipSchema");
const Post = require("../../../../Models/SocialMedia/postSchema");
const User = require("../../../../Models/usermode");

const CreateTip = async (req, res) => {
  try {
    const { sender, receiver, post, amount } = req.body;

    if (!sender || !receiver || !post || !amount) {
      return res.status(400).json({
        success: false,
        message: "sender, receiver, post and amount are required",
      });
    }

    // ✅ Validate amount
    if (amount < 40 || amount > 1440) {
      return res.status(400).json({
        success: false,
        message: "Tip amount must be between ₹40 and ₹1440",
      });
    }

    // ✅ Check if post exists
    const foundPost = await Post.findById(post).populate("user");
    if (!foundPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Prevent self-tipping
    if (sender.toString() === receiver.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot tip your own post",
      });
    }

    // ✅ Create tip record
    const tip = new Tip({
      sender,
      receiver,
      post,
      amount,
      status: "success", // later can integrate payment gateway
    });

    await tip.save();

    res.status(201).json({
      success: true,
      message: "Tip sent successfully",
      tip,
    });
  } catch (error) {
    console.error("Error creating tip:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = CreateTip;
