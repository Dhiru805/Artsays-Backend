const express = require('express');
const {
    createMaterialStamp,
    getMaterialStamp,
    updateMaterialStamp,
    deleteMaterialStamp,
    getAllMaterialStamp
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-stamp/create', createMaterialStamp);
router.get('/packaging-material-setting/material-stamp/:userId', getMaterialStamp);
router.put('/packaging-material-setting/material-stamp/update/:id', updateMaterialStamp);
router.delete('/packaging-material-setting/material-stamp/delete/:id', deleteMaterialStamp);
router.get('/packaging-material-setting/material-stamp/', getAllMaterialStamp);

module.exports = router;