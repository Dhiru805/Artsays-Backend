
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = "uploads/reviews";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  }
});

// Optional: Validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extnameValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetypeValid = allowedTypes.test(file.mimetype);
  if (extnameValid && mimetypeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and WEBP image formats are allowed"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 5MB max per file
    files: 3 // max 3 files
  },
  fileFilter
});

module.exports = upload;
