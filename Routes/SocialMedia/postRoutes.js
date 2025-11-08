const express = require("express");
const router = express.Router();
const authMiddleware= require("../../Middlewares/authMiddleware")
const { CreatePost, getCollaborators,likeUnlikePost ,saveUnsavePost, addComment, deleteComment, getComments,PromotePost,CancelPromotePost} = require("../../controllers/SocialMedia/SocialMediaProfile/index");
const {uploadPostImages} = require("../../Middlewares/Multerfile/PostImage");
router.post("/social-media/create-post",authMiddleware, uploadPostImages, CreatePost);
router.get("/social-media/collaborator",authMiddleware, getCollaborators);
router.post("/social-media/posts/:postId/likeUnlike",authMiddleware, likeUnlikePost);
router.post("/social-media/posts/:postId/saveUnsave",authMiddleware, saveUnsavePost);

router.post("/social-media/posts/:postId/comments",authMiddleware, addComment);
router.delete("/social-media/posts/:postId/comments/:commentId",authMiddleware ,deleteComment);
router.get("/social-media/posts/:postId/comments",authMiddleware, getComments);
router.post("/social-media/posts/promote",authMiddleware, PromotePost);
router.post("/social-media/posts/promote/cancel",authMiddleware, CancelPromotePost);

module.exports = router;

