const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/product"); 
// const authMiddleware = require("../Middlewares/authMiddleware");
const {
      cropImage,
      getImage,
      editcropimage,
      getAllApprovedstatusproduct,
      getApprovedProduct,
      createShippingAddress,
      getShippingAddressesByProductId,
      updatedefaultshippingadress,
      deleteshippingadress,
      getDefaultShippingAddressByProductId,
      updateProductbyid
 } = require("../controllers/CropImage/index");



router.post("/cropImage", upload, cropImage);
router.get("/get-cropImage",getImage);
router.put('/editcropImage/:id',editcropimage);
router.get("/get-allapprovedproduct",getAllApprovedstatusproduct);
router.get("/get-profileproduct",getApprovedProduct)
router.post("/create-address", createShippingAddress);
router.get("/get-address/:userId", getShippingAddressesByProductId);
router.put("/update-shipping-address",updatedefaultshippingadress);
router.delete("/delete-address/:id",deleteshippingadress);
router.get("/get-default-shipping-address/:productId",getDefaultShippingAddressByProductId);
router.put('/update-products/:id', upload, updateProductbyid);



 

module.exports = router;
