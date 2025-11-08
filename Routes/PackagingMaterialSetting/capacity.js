const express = require('express');
const {
    createMaterialCapacity,
    getMaterialCapacity,
    updateMaterialCapacity,
    deleteMaterialCapacity
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-capacity/create', createMaterialCapacity);
router.get('/packaging-material-setting/material-capacity/:userId', getMaterialCapacity);
router.put('/packaging-material-setting/material-capacity/update/:id', updateMaterialCapacity);
router.delete('/packaging-material-setting/material-capacity/delete/:id', deleteMaterialCapacity);

module.exports = router;