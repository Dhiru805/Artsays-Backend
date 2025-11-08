const express = require("express");
const {
  createPolicy,
  getPolicies,
  getPolicyById,
  deletePolicy,
  updatePolicy,
  CreateBadge,
  GetBadges,
  GetBadgeById,
  UpdateBadge,
  getSponsoredPosts,
  getAllBadgeUsers
} = require("../controllers/CommunityCMS/index");
const { getAllReports, updateReportStatus ,suspendUser,unsuspendUser,} = require("../controllers/SocialMedia/SocialMediaProfile/Report/ReportModeration");


const {badgeUploadMiddleware} = require("../Middlewares/badgeUpload");


const router = express.Router();

router.get("/admin/badges", getAllBadgeUsers);
router.post("/social-policies", createPolicy);        
router.get("/social-policies", getPolicies);          
router.get("/social-policies/:id", getPolicyById);   
router.delete("/social-policies/:id", deletePolicy);  
router.put("/social-policies/:id", updatePolicy);

router.post("/badges", badgeUploadMiddleware, CreateBadge);
router.put("/badges/:id", badgeUploadMiddleware, UpdateBadge);
router.get("/badges", GetBadges);
router.get("/badges/:id", GetBadgeById);



// Admin-only endpoints

//  Get all reports
router.get("/admin/reports", getAllReports);

//  Update report status (e.g., reviewed / action-taken)
router.put("/admin/reports/:reportId/status", updateReportStatus);

//  Suspend user (for X days)
router.post("/admin/suspend/:userId", suspendUser);

router.post("/admin/unsuspend/:userId", unsuspendUser)


// 🔹 GET all sponsored posts
router.get("/admin/sponsored-posts", getSponsoredPosts);



module.exports = router;