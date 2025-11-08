const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory for uploaded post images
const uploadDir = path.join(__dirname, "../../uploads/Posts");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) { // ✅ correct check
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Middleware for multiple post images
const uploadPostImages = upload.array("images", 5); 
// 👆 "images" must match frontend formData.append("images", file)

module.exports = { upload, uploadPostImages };
