const express = require('express');
const {
    createMaterialName,
    getMaterialName,
    getMaterialNameImage,
    updateMaterialName,
    deleteMaterialName
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-name/create', createMaterialName);
router.get('/packaging-material-setting/material-name/:userId', getMaterialName);
router.get('/packaging-material-setting/material-name/:userId/:materialName', getMaterialNameImage);
router.put('/packaging-material-setting/material-name/update/:id', updateMaterialName);
router.delete('/packaging-material-setting/material-name/delete/:id', deleteMaterialName);

module.exports = router;