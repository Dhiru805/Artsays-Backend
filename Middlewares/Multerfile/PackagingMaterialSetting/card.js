const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageDir = "./uploads/materialCard";

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  const isImage =
    (ext === ".jpg" || ext === ".jpeg" || ext === ".png") &&
    (mime === "image/jpeg" || mime === "image/png");

  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png images are allowed"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const timestamp = Date.now();
    const originalName = path.basename(file.originalname, ext);
    cb(null, `${originalName}_${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
}).fields([
  { name: "materialCardImage", maxCount: 1 },
]);



const getFilePath = (file) => {
  if (!file) return '';
  return path.join('uploads', 'materialCard', file.filename);
};

module.exports = { upload, getFilePath };