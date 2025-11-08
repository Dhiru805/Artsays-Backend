const Post = require("../../../../Models/SocialMedia/postSchema");
const Profile = require("../../../../Models/SocialMedia/profileSchema");

const CreatePost = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files); // Multer puts uploaded files here

    const { userId, caption, location, collaborators } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // ✅ Extract hashtags from caption (convert to lowercase)
    const hashtags = caption
      ? (caption.match(/#\w+/g) || []).map(tag => tag.slice(1).toLowerCase())
      : [];

    // ✅ Use req.files instead of req.body.images
    const images = req.files
      ? req.files.map(file => `/uploads/Posts/${file.filename}`)
      : [];

    // Handle collaborators
    let validCollaborators = [];
    if (collaborators) {
      const arr = Array.isArray(collaborators) ? collaborators : [collaborators];
      validCollaborators = arr.filter(id => id && id.trim() !== "");
    }

    const newPost = new Post({
      user: userId,
      caption,
      images,
      collaborators: validCollaborators,
      location,
      hashtags, // ✅ save hashtags in schema
    });

    await newPost.save();

    await Profile.findOneAndUpdate(
      { user: userId },
      { $push: { posts: newPost._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = CreatePost;
