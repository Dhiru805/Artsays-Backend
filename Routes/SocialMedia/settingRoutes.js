const express = require("express");
const authMiddleware= require("../../Middlewares/authMiddleware")

const {
  UpdateCommentSettings,
  BlockUnblock,
  UpdateCollaborationMentionSettings,
  GetCollaborationMentionSettings,
  GetPublishedPolicies,
  PurchaseBadge,
  CheckEligibility,
  GetPerks,
  CreateMembership,
  GetMembership,
  GetMembershipById,
  UpdateMembership,
  DeleteMembership,
  MembershipToggle,
  GetMembershipsActive,
  TogglePostProducts,
  GetPostProducts
} = require("../../controllers/SocialMedia/SocialMediaSettings/index");

const router = express.Router();

router.put("/social-media/comment-settings",authMiddleware, UpdateCommentSettings);

router.put("/social-media/block-unblock",authMiddleware, BlockUnblock);

// Update settings
router.put(
  "/social-media/settings/collab-mention",authMiddleware,
  UpdateCollaborationMentionSettings
);

router.get("/social-policies/published",authMiddleware, GetPublishedPolicies);

// Get settings
router.get(
  "/social-media/settings/collab-mention/:userId",authMiddleware,
  GetCollaborationMentionSettings
);
router.get("/memberships/active",authMiddleware, GetMembershipsActive);
router.put("/membership/toggle-active",authMiddleware, MembershipToggle);
router.post("/badges/check-eligibility",authMiddleware, CheckEligibility);
router.post("/badges/purchase",authMiddleware, PurchaseBadge);

router.get("/perks", GetPerks);

router.delete("/membership/:membershipId",authMiddleware, DeleteMembership);
router.post("/membership/create",authMiddleware, CreateMembership);
router.get("/membership",authMiddleware, GetMembership);
router.get("/membership/:membershipId",authMiddleware, GetMembershipById);
router.put("/membership/:membershipId", UpdateMembership);


router.post("/profile/post-products/toggle",authMiddleware, TogglePostProducts);

router.get("/profile/post-products",authMiddleware, GetPostProducts);




module.exports = router;
