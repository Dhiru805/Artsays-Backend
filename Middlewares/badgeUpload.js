const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Directory for uploaded badge images
const uploadDir = "uploads/badge";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Multer instance
const upload = multer({ storage, fileFilter });

// Middleware for single badge image
const badgeUploadMiddleware = (req, res, next) => {
  upload.single("badgeImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = { upload, badgeUploadMiddleware };
