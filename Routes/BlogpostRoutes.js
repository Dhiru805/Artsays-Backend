// routes/blogRoutes.js
const express = require("express");
const { createBlogPost, upload, deleteBlogPost, getUserBlogs, updateBlogPost,
    getAllBlogs, updateBlogStatus, fetchBlogById, getBlogsByUserId,
    getAllBlogsstatusAprroved, getBlogsByUserIdandstaus, updateBlogViews, updateBlogLikes, updateBlogReadingTime }
    = require("../controllers/blogController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("blogImage"), createBlogPost);
router.delete("/:id", deleteBlogPost);
router.get("/user-blogs/:userId", getUserBlogs);
router.put("/update/:id", authMiddleware, upload.single("blogImage"), updateBlogPost);
router.get("/all-blogs", getAllBlogs);
router.get("/statusapproved-blogs", getAllBlogsstatusAprroved);
router.put('/update-status/:id', updateBlogStatus);
router.get("/getblogbyid/:id", fetchBlogById);
router.get('/blogs/user/:userId', getBlogsByUserId);
router.get('/blogs/userstatus/:userId', getBlogsByUserIdandstaus);

router.put("/blogs/:id/views", updateBlogViews);
router.put("/blogs/:id/likes", updateBlogLikes);
router.put("/blogs/:id/reading-time", updateBlogReadingTime)

module.exports = router;
