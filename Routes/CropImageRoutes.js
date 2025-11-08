const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/product"); 
// const authMiddleware = require("../Middlewares/authMiddleware");
const {
      cropImage,
      getImage,
      editcropimage,
      getAllApprovedstatusproduct,
      getApprovedProduct
 } = require("../controllers/CropImage/index");



router.post("/cropImage", upload, cropImage);
router.get("/get-cropImage",getImage);
router.put('/editcropImage/:id',editcropimage);
router.get("/get-allapprovedproduct",getAllApprovedstatusproduct);
router.get("/get-profileproduct",getApprovedProduct)

module.exports = router;
