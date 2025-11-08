const express = require('express');
const {
    createMaterialSize,
    getMaterialSize,
    updateMaterialSize,
    deleteMaterialSize
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-size/create', createMaterialSize);
router.get('/packaging-material-setting/material-size/:userId', getMaterialSize);
router.put('/packaging-material-setting/material-size/update/:id', updateMaterialSize);
router.delete('/packaging-material-setting/material-size/delete/:id', deleteMaterialSize);

module.exports = router;