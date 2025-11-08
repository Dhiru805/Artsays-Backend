const PostProfile = require("../SocialMediaProfile/Profile/PostProfile.js");
const GetProfile = require("../SocialMediaProfile/Profile/GetProfile.js");
const CreatePost = require("../SocialMediaProfile/post/CreatePost.js");
const FollowUser = require("../SocialMediaProfile/followUnfollow/Follow.js");
const UnfollowUser = require("../SocialMediaProfile/followUnfollow/Unfollow.js");
const UpdateProfile = require("../SocialMediaProfile/Profile/UpdateProfile.js");
const getCollaborators = require("../SocialMediaProfile/post/CollaboratorSearch.js");
const GetSuggestedUsers = require("../SocialMediaProfile/SuggestedUser/SuggestedUser.js");
const CreateLive = require("../SocialMediaProfile/Live/CreateLive.js");
const {
  updateLive: UpdateLive,
  setSocketIO: setUpdateLiveSocketIO,
} = require("../SocialMediaProfile/Live/UpdateLive.js");
const GetSuggestedUsersProfile = require("../SocialMediaProfile/SuggestedUser/SuggestedUserProfile.js");
const saveUnsavePost = require("../SocialMediaProfile/post/SavedPost.js");
const likeUnlikePost = require("../SocialMediaProfile/Like&Comment/Like.js");
const Homepage = require("../SocialMediaProfile/Homepage/HomePage.js");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../SocialMediaProfile/Like&Comment/Comment.js");
const ExploreController = require("../SocialMediaProfile/Homepage/ExplorePage.js");
const Search = require("../SocialMediaProfile/searchBar/Search.js");
const DeleteAccount = require("../SocialMediaProfile/Profile/DeleteProfile.js");
const {
  AddRecentSearch,
  RemoveRecentSearch,
  ClearRecentSearches,
  GetRecentSearches,
} = require("../SocialMediaProfile/searchBar/RecentSearches.js");
const {
  AddSearchBarSuggestedUser,
  RemoveSearchBarSuggestedUser,
  GetSearchBarSuggestedUsers,
} = require("../SocialMediaProfile/searchBar/SeachBarSuggestedUser.js");
const Mention = require("../SocialMediaProfile/mention/Mention.js");
// const UpdateLive = require("../SocialMediaProfile/Live/UpdateLive.js")
const GetLive = require("../SocialMediaProfile/Live/GetLive.js");
const PayTip = require("../SocialMediaProfile/Tip/PayTip.js");
const CreateReport = require("../SocialMediaProfile/Report/CreateReport.js");
const PromotePost = require("../SocialMediaProfile/post/PromotePost.js");
const CancelPromotePost = require("../SocialMediaProfile/post/CancelPromotePost.js");
const initLiveSockets = require("../SocialMediaProfile/Live/LiveSocket.js");

module.exports = {
  PostProfile,
  GetProfile,
  CreatePost,
  FollowUser,
  UnfollowUser,
  UpdateProfile,
  getCollaborators,
  GetSuggestedUsers,
  GetSuggestedUsersProfile,
  saveUnsavePost,
  likeUnlikePost,
  addComment,
  deleteComment,
  getComments,
  Homepage,
  ExploreController,
  Search,
  AddRecentSearch,
  RemoveRecentSearch,
  ClearRecentSearches,
  GetRecentSearches,
  AddSearchBarSuggestedUser,
  RemoveSearchBarSuggestedUser,
  GetSearchBarSuggestedUsers,
  DeleteAccount,
  Mention,
  CreateLive,
  UpdateLive,
  GetLive,
  PayTip,
  CreateReport,
  PromotePost,
  CancelPromotePost,
  initLiveSockets,
};
