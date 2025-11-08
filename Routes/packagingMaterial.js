const express = require('express');
const {
    createPackageMaterial,
    getPackageMaterial,
    updatePackageMaterial,
    getPackageMaterialById,
    deletePackageMaterial,
    getAllMaterialNames
} = require("../controllers/PackagingMaterial/index");
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/package-material/material/create', upload.any(), createPackageMaterial);
router.get('/package-material/material/:userId', getPackageMaterial);
router.put('/package-material/material/update/:id', upload.any(), updatePackageMaterial);
router.get('/package-material/material/:userId/:id', getPackageMaterialById);
router.delete('/package-material/material/delete/:id', deletePackageMaterial);
router.get('/package-material/material', getAllMaterialNames);

module.exports = router;