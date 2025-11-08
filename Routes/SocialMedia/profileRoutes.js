const express = require("express");
const { 
  PostProfile, 
  GetProfile, 
  UpdateProfile, 
  GetSuggestedUsers,
  FollowUser,
  UnfollowUser,
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
  GetSuggestedUsersProfile,
  DeleteAccount,
  Mention,
  PayTip,
  CreateReport
}
 = require("../../controllers/SocialMedia/SocialMediaProfile/index");
const {uploadMiddleware} = require("../../Middlewares/uploadMiddleware")
const authMiddleware= require("../../Middlewares/authMiddleware")

const router = express.Router();

//  POST route → create profile
router.post('/social-media/create-profile', uploadMiddleware, PostProfile);

//  GET route → fetch profile by userId
router.get('/social-media/profile/:userId',authMiddleware, GetProfile);

//  PUT route → update profile
router.put('/social-media/profile/update', authMiddleware,uploadMiddleware, UpdateProfile);

//  GET route → suggested users
router.get('/social-media/suggested-users',authMiddleware, GetSuggestedUsers);

router.get('/social-media/suggested-user-profile/',authMiddleware, GetSuggestedUsersProfile);

router.post('/social-media/follow/:targetUserId',authMiddleware, FollowUser);

router.post('/social-media/unfollow/:targetUserId',authMiddleware, UnfollowUser);

router.get('/social-media/homepage',authMiddleware, Homepage);

router.get('/social-media/explore',authMiddleware, ExploreController);

router.get('/social-media/search',authMiddleware, Search);


// 👉 Add user to SearchBarSuggestedUsers
router.post("/social-media/searchbar-suggested/add", AddSearchBarSuggestedUser);

// Remove a specific SearchBarSuggestedUser
router.delete("/social-media/searchbar-suggested/:userId/:suggestedUserId",authMiddleware, RemoveSearchBarSuggestedUser);

// Get all SearchBarSuggestedUsers
router.get("/social-media/searchbar-suggested/:userId",authMiddleware, GetSearchBarSuggestedUsers);


// ==============================
// 📌 Recent Searches
// ==============================

// Add a recent search
router.post("/social-media/recent-searches/add",authMiddleware, AddRecentSearch);

// Clear all recent searches
router.delete("/social-media/recent-searches/:userId/clear",authMiddleware, ClearRecentSearches);

// Remove one recent search
router.delete("/social-media/recent-searches/:userId/:searchId",authMiddleware, RemoveRecentSearch);



// Get recent searches for a user
router.get("/social-media/recent-searches/:userId",authMiddleware, GetRecentSearches);

router.delete('/social-media/delete-account/:userId',authMiddleware, DeleteAccount);

router.get("/social-media/mention",authMiddleware, Mention);

// ----------------tipping-----------------


// ✅ Create a new tip
router.post("/tips/create",authMiddleware, PayTip);


// --------------------reporting-----------------

// ✅ Create a new report
router.post("/reports/create",authMiddleware, CreateReport);



module.exports = router;
