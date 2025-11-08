const express = require('express');
const {
    createMaterialCard,
    getMaterialCard,
    updateMaterialCard,
    deleteMaterialCard,
    getAllMaterialCard
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-card/create', createMaterialCard);
router.get('/packaging-material-setting/material-card/:userId', getMaterialCard);
router.put('/packaging-material-setting/material-card/update/:id', updateMaterialCard);
router.delete('/packaging-material-setting/material-card/delete/:id', deleteMaterialCard);
router.get('/packaging-material-setting/material-card', getAllMaterialCard);

module.exports = router;