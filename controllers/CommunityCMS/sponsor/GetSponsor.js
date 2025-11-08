const Post = require("../../../Models/SocialMedia/postSchema");
const User = require("../../../Models/usermode");

// 🧾 Get all promoted posts for Admin Dashboard
const getSponsoredPosts = async (req, res) => {
  try {
    // 🔹 Fetch all posts with active or completed promotions
    const sponsoredPosts = await Post.find({
      isPromoted: true,
      "promotionDetails.status": { $in: ["active", "completed"] },
    })
      .populate("user", "username email profilePhoto")
      .populate("promotionDetails.category", "name")
      .sort({ "promotionDetails.startDate": -1 })
      .lean();

    if (!sponsoredPosts.length) {
      return res.status(200).json({
        success: true,
        message: "No sponsored posts found.",
        sponsoredPosts: [],
      });
    }

    // 🧮 Map structured response for admin dashboard
    const formattedPosts = sponsoredPosts.map((post) => ({
      postId: post._id,
      caption: post.caption || "(no caption)",
      images: post.images || [],
      promotedBy: {
        username: post.user?.username || "Unknown",
        email: post.user?.email || "N/A",
        profilePhoto: post.user?.profilePhoto || null,
        userId: post.user?._id,
      },
      promotionDetails: {
        categoryName: post.promotionDetails?.category?.name || "N/A",
        goal: post.promotionDetails?.goal || "N/A",
        dailyBudget: post.promotionDetails?.dailyBudget || 0,
        totalBudget: post.promotionDetails?.totalBudget || 0,
        durationDays: post.promotionDetails?.durationDays || 0,
        gstAmount: post.promotionDetails?.gstAmount || 0,
        estimatedReach: post.promotionDetails?.estimatedReach || "N/A",
        startDate: post.promotionDetails?.startDate,
        endDate: post.promotionDetails?.endDate,
        status: post.promotionDetails?.status || "pending",
        paymentStatus: post.promotionDetails?.paymentStatus || "unpaid",
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedPosts.length,
      message: "Sponsored posts fetched successfully.",
      sponsoredPosts: formattedPosts,
    });
  } catch (error) {
    console.error("❌ Error fetching sponsored posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching sponsored posts.",
      error: error.message,
    });
  }
};

module.exports = getSponsoredPosts;
