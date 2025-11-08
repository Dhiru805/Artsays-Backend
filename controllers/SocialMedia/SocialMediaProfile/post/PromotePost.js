const mongoose = require("mongoose");
const Post = require("../../../../Models/SocialMedia/postSchema");
const User = require("../../../../Models/usermode");
const ArtistDetails = require("../../../../Models/artistdetails");
const UserPreferences = require("../../../../Models/buyerpreferart");

const PromotePost = async (req, res) => {
  try {
    const { postId, category, goal, dailyBudget, durationDays, userId } =
      req.body;

    // ✅ Basic validation
    if (!postId || !dailyBudget || !durationDays || !userId) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: postId, dailyBudget, durationDays, userId",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(postId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid postId or userId" });
    }

    // ✅ Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // ✅ Calculate total + GST
    const gstAmount = Number((dailyBudget * 0.18).toFixed(2));
    const totalBudget = Number(
      ((dailyBudget + gstAmount) * durationDays).toFixed(2)
    );

    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + durationDays * 24 * 60 * 60 * 1000
    );

    const estimatedReach = `${1800 + durationDays * 100}-${
      4800 + durationDays * 150
    }`;

    // ✅ Find target audience (if category provided)
    let targetAudience = [];
    if (category) {
      const [artistUsers, buyerUsers] = await Promise.all([
        ArtistDetails.find({ artCategories: { $in: [category] } }).select(
          "userId"
        ),
        UserPreferences.find({
          preferredArtCategories: { $in: [category] },
        }).select("userId"),
      ]);

      // Merge + dedupe + remove self
      const combinedUserIds = [
        ...artistUsers.map((a) => a.userId.toString()),
        ...buyerUsers.map((b) => b.userId.toString()),
      ];

      targetAudience = [...new Set(combinedUserIds)].filter(
        (id) => id !== userId
      );
    }

    // ✅ Fill remaining audience with random users if still small
    if (targetAudience.length < 50) {
      const fillers = await User.aggregate([
        {
          $match: {
            _id: {
              $nin: [
                ...targetAudience.map((id) => new mongoose.Types.ObjectId(id)),
                new mongoose.Types.ObjectId(userId),
              ],
            },
          },
        },
        { $sample: { size: 50 - targetAudience.length } },
        { $project: { _id: 1 } },
      ]);
      targetAudience = [
        ...targetAudience,
        ...fillers.map((f) => f._id.toString()),
      ];
    }

    // ✅ Save promotion details
    post.isPromoted = true;
    post.promotionDetails = {
      category: category || null,
      goal,
      dailyBudget,
      durationDays,
      totalBudget,
      gstAmount,
      estimatedReach,
      startDate,
      endDate,
      status: "active",
      paymentStatus: "paid",
    };
    post.targetAudience = targetAudience;

    await post.save();

    return res.status(200).json({
      success: true,
      message: "✅ Post promoted successfully!",
      post,
    });
  } catch (error) {
    console.error("❌ Error promoting post:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while promoting post",
      error: error.message,
    });
  }
};

module.exports = PromotePost;
