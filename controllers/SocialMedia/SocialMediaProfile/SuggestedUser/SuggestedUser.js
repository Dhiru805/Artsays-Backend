const mongoose = require("mongoose");
const Profile = require("../../../../Models/SocialMedia/profileSchema");
const User = require("../../../../Models/usermode");
const ArtistDetails = require("../../../../Models/artistdetails");
const UserPreferences = require("../../../../Models/buyerpreferart");

const GetSuggestedUsers = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // 1️⃣ Get current user profile (self + following)
    const profile = await Profile.findOne({ user: userId }).populate(
      "following",
      "_id"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const followingIds = profile.following.map((f) => f._id.toString());
    const excludeIds = [userId, ...followingIds];

    // 2️⃣ Get logged-in user categories
    let categories = [];
    const currentUser = await User.findById(userId).lean();

    if (
      currentUser.userType === "Artist" ||
      currentUser.userType === "Seller"
    ) {
      const artist = await ArtistDetails.findOne({ userId }).lean();
      if (artist?.artCategories?.length > 0) {
        categories = artist.artCategories.map((c) => c.toString());
      }
    } else if (currentUser.userType === "Buyer") {
      const pref = await UserPreferences.findOne({ userId }).lean();
      if (pref?.preferredArtCategories?.length > 0) {
        // ✅ only first element for Buyer
        categories = [pref.preferredArtCategories[0].toString()];
      }
    }

    let suggestedUsers = [];

    if (categories.length > 0) {
      // 3️⃣ Get candidate users (excluding self + following)
      const candidates = await User.find({
        _id: { $nin: excludeIds },
      })
        .select("username profilePhoto userType")
        .lean();

      // 4️⃣ Manually check overlap
      for (const u of candidates) {
        let hasOverlap = false;

        if (u.userType === "Artist" || u.userType === "Seller") {
          const details = await ArtistDetails.findOne({ userId: u._id }).lean();
          if (
            details?.artCategories?.some((c) =>
              categories.includes(c.toString())
            )
          ) {
            hasOverlap = true;
          }
        } else if (u.userType === "Buyer") {
          const pref = await UserPreferences.findOne({ userId: u._id }).lean();
          if (
            pref?.preferredArtCategories?.some((c) =>
              categories.includes(c.toString())
            )
          ) {
            hasOverlap = true;
          }
        }

        if (hasOverlap) suggestedUsers.push(u);
        if (suggestedUsers.length >= 5) break;
      }
    }

    // 5️⃣ Fill remaining spots with random users
    if (suggestedUsers.length < 5) {
      const alreadyIncludedIds = [
        ...excludeIds,
        ...suggestedUsers.map((u) => u._id.toString()),
      ];

      const fillers = await User.aggregate([
        {
          $match: {
            _id: {
              $nin: alreadyIncludedIds.map(
                (id) => new mongoose.Types.ObjectId(id)
              ),
            },
          },
        },
        { $sample: { size: 5 - suggestedUsers.length } },
        { $project: { username: 1, profilePhoto: 1, userType: 1 } },
      ]);

      suggestedUsers = [...suggestedUsers, ...fillers];
    }

    return res.json({ suggestedUsers });
  } catch (error) {
    console.error("Error in GetSuggestedUsers:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = GetSuggestedUsers;
