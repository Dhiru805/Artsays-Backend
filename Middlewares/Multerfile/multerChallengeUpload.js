const multer = require("multer");
const path = require("path");
const fs = require("fs");

const challengeImageDir = "./uploads/ChallengeImages";


try {
  if (!fs.existsSync(challengeImageDir)) {
    fs.mkdirSync(challengeImageDir, { recursive: true });
  }
} catch (error) {
  console.error("Error creating challenge image directory:", error);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, challengeImageDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|svg/;
  const isMimeTypeValid = allowedFileTypes.test(file.mimetype);
  const isExtNameValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeTypeValid && isExtNameValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, or PNG files are allowed."));
  }
};


const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, 
  fileFilter,
}).single("bannerImage"); 

module.exports = upload;
