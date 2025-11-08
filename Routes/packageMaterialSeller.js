const express = require('express');
const {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderId,
    updateStatusById
} = require("../controllers/Seller/index");
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.post("/package-material/seller/order/create", upload.any(), createOrder);
router.get("/package-material/seller/:userId?", getOrder);
router.put("/package-material/seller/order/update/:id", upload.any(), updateOrder);
router.delete("/package-material/seller/order/delete/:id", deleteOrder);
router.get("/package-material/seller/order/:userId/:id", getOrderById);
router.get("/package-material/seller/order/:id", getOrderId);
router.put("/package-material/seller/order/status/:id", updateStatusById);

module.exports = router;