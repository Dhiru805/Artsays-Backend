const  UpdateCommentSettings = require("./CommentSetting/CommentSetting.js");
const BlockUnblock = require("./Blocked/BlockUnblock.js");
const {  UpdateCollaborationMentionSettings, GetCollaborationMentionSettings}= require("./Collaboration&Mention/Collab&MetionSetting.js");
const GetPublishedPolicies = require("./PrivacyPolicy/GetPolicies.js");
const PurchaseBadge = require("./Verified/Veryfying.js");
const CheckEligibility = require("./Verified/BadgeEligibility.js");
const GetPerks = require("./Membership&Perks/GetPerks.js")
const CreateMembership = require("./Membership&Perks/CreateMembership.js");
const GetMembership = require("./Membership&Perks/GetMembership.js");
const GetMembershipById = require("./Membership&Perks/GetMembershipById.js");
const UpdateMembership = require("./Membership&Perks/UpdateMembership.js");
const DeleteMembership = require("./Membership&Perks/DeleteMembership.js");
const MembershipToggle = require("./Membership&Perks/MembershipToggle.js");
const GetMembershipsActive = require("./Membership&Perks/GetToggleStatus.js");
const TogglePostProducts = require("./PostProduct/PostProduct.js");
const GetPostProducts = require("./PostProduct/GetProduct.js");

module.exports = {
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
};