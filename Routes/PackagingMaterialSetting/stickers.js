const express = require('express');
const {
    createMaterialStickers,
    getMaterialStickers,
    updateMaterialStickers,
    deleteMaterialStickers,
    getAllMaterialStickers
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-stickers/create', createMaterialStickers);
router.get('/packaging-material-setting/material-stickers/:userId', getMaterialStickers);
router.put('/packaging-material-setting/material-stickers/update/:id', updateMaterialStickers);
router.delete('/packaging-material-setting/material-stickers/delete/:id', deleteMaterialStickers);
router.get('/packaging-material-setting/material-stickers/', getAllMaterialStickers);

module.exports = router;