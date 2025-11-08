const mongoose = require("mongoose");
const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const Homepage = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Valid User ID is required" });
    }

    // 1️⃣ User profile
    const profile = await Profile.findOne({ user: userId }).select("saved following blocked");
    if (!profile)
      return res.status(404).json({ success: false, message: "Profile not found" });

    const followingIds = profile.following.map((id) => id.toString());
    const savedIds = profile.saved.map((id) => id.toString());
    const blockedIds = profile.blocked.map((id) => id.toString());

    // users who blocked me
    const blockedMeProfiles = await Profile.find({ blocked: userId }).select("user");
    const blockedMeIds = blockedMeProfiles.map((p) => p.user.toString());
    const excludedIds = [...blockedIds, ...blockedMeIds];
    const userIds = [userId, ...followingIds];

    // 2️⃣ Normal feed (self + following)
    const followingPosts = await Post.find({
      user: { $in: userIds, $nin: excludedIds },
    })
      .populate({
        path: "user",
        select: "username profilePhoto verified website",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .populate({
        path: "comments.user",
        select: "username profilePhoto verified",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    // 3️⃣ Discovery posts
    const randomPosts = await Post.aggregate([
      {
        $match: {
          user: {
            $nin: [
              ...userIds.map((id) => new mongoose.Types.ObjectId(id)),
              ...excludedIds.map((id) => new mongoose.Types.ObjectId(id)),
            ],
          },
          isPromoted: { $ne: true },
        },
      },
      { $sample: { size: 20 } },
    ]);

    const randomPostIds = randomPosts.map((p) => p._id);
    const populatedRandomPosts = await Post.find({ _id: { $in: randomPostIds } })
      .populate({
        path: "user",
        select: "username profilePhoto verified website",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .populate({
        path: "comments.user",
        select: "username profilePhoto verified",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .lean();

    // 4️⃣ Promoted posts (targeted + random)
    const now = new Date();

    const targetedPromoted = await Post.find({
      isPromoted: true,
      "promotionDetails.status": "active",
      "promotionDetails.endDate": { $gte: now },
      targetAudience: { $in: [userId] },
    })
      .populate({
        path: "user",
        select: "username profilePhoto verified website",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .lean();

    const randomPromoted = await Post.aggregate([
      {
        $match: {
          isPromoted: true,
          "promotionDetails.status": "active",
          "promotionDetails.endDate": { $gte: now },
          targetAudience: { $nin: [new mongoose.Types.ObjectId(userId)] },
        },
      },
      { $sample: { size: 3 } },
    ]);

    const randomPromotedIds = randomPromoted.map((p) => p._id);
    const populatedRandomPromoted = await Post.find({ _id: { $in: randomPromotedIds } })
      .populate({
        path: "user",
        select: "username profilePhoto verified website",
        populate: {
          path: "verified",
          model: "VerificationBadge",
          select: "badgeName badgeImage",
        },
      })
      .lean();

    // ✅ STEP 1: Merge + dedupe promoted posts
    const promotedMap = new Map();
    [...targetedPromoted, ...populatedRandomPromoted].forEach((p) => {
      promotedMap.set(p._id.toString(), p);
    });
    let promotedPosts = Array.from(promotedMap.values());

    // ✅ STEP 2: Merge normal posts and dedupe completely
    const normalMap = new Map();
    [...followingPosts, ...populatedRandomPosts].forEach((p) => {
      normalMap.set(p._id.toString(), p);
    });
    let normalPosts = Array.from(normalMap.values());

    // ✅ STEP 3: Ensure promoted posts don't appear in normal posts
    const promotedIdsSet = new Set(promotedPosts.map((p) => p._id.toString()));
    normalPosts = normalPosts.filter((p) => !promotedIdsSet.has(p._id.toString()));

    // ✅ Interleave ads (1 ad every 5 posts, start around top)
    const finalFeed = [];
    let promoIndex = 0;
    for (let i = 0; i < normalPosts.length; i++) {
      finalFeed.push(normalPosts[i]);

      if (i === 1 && promoIndex < promotedPosts.length) {
        finalFeed.push(promotedPosts[promoIndex++]);
      }

      if ((i + 1) % 5 === 0 && promoIndex < promotedPosts.length) {
        finalFeed.push(promotedPosts[promoIndex++]);
      }
    }
    while (promoIndex < promotedPosts.length) {
      finalFeed.push(promotedPosts[promoIndex++]);
    }

    // 6️⃣ Add saved/comment/follow button flags
    const ownerIds = [...new Set(finalFeed.map((p) => p.user._id.toString()))];
    const ownerProfiles = await Profile.find({ user: { $in: ownerIds } })
      .select("user followers following commentSettings")
      .lean();

    const profileMap = {};
    ownerProfiles.forEach((p) => (profileMap[p.user.toString()] = p));

    const canUserComment = (postOwnerProfile, loggedInUserId) => {
      const allowFrom = postOwnerProfile?.commentSettings?.allowCommentsFrom || "everyone";
      if (String(postOwnerProfile.user) === String(loggedInUserId)) return true;
      if (allowFrom === "everyone") return true;
      if (allowFrom === "followers")
        return postOwnerProfile.followers.some((id) => String(id) === String(loggedInUserId));
      if (allowFrom === "following")
        return postOwnerProfile.following.some((id) => String(id) === String(loggedInUserId));
      if (allowFrom === "mutual") {
        const isFollower = postOwnerProfile.followers.some((id) => String(id) === String(loggedInUserId));
        const isFollowing = postOwnerProfile.following.some((id) => String(id) === String(loggedInUserId));
        return isFollower && isFollowing;
      }
      return false;
    };

    const postsWithFlags = finalFeed.map((post) => {
      const ownerProfile = profileMap[post.user._id.toString()];
      const filteredComments = (post.comments || []).filter(
        (c) => c.user && !excludedIds.includes(c.user._id.toString())
      );

      const isFollowing = followingIds.includes(post.user._id.toString());
      const isOwnPost = String(post.user._id) === String(userId);

      return {
        ...post,
        isSaved: savedIds.includes(post._id.toString()),
        canComment: ownerProfile ? canUserComment(ownerProfile, userId) : false,
        comments: filteredComments,
        isAd: post.isPromoted === true,
        showFollowButton: !isFollowing && !isOwnPost,
      };
    });

    res.status(200).json({
      success: true,
      message: "Homepage feed fetched successfully (no duplicate sponsored posts)",
      posts: postsWithFlags,
    });
  } catch (error) {
    console.error("Error fetching homepage posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = Homepage;
