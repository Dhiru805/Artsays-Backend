const express = require('express');
const {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderId,
    updateStatusById
} = require("../controllers/Artist/index");
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.post("/package-material/order/create", upload.any(), createOrder);
router.get("/package-material/:userId?", getOrder);
router.put("/package-material/order/update/:id", upload.any(), updateOrder);
router.delete("/package-material/order/delete/:id", deleteOrder);
router.get("/package-material/order/:userId/:id", getOrderId);
router.get("/package-material/order/:id", getOrderById);
router.put("/package-material/order/status/:id", updateStatusById);

module.exports = router;