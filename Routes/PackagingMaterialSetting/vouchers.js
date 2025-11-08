const express = require('express');
const {
    createMaterialVouchers,
    getMaterialVouchers,
    updateMaterialVouchers,
    deleteMaterialVouchers,
    getAllMaterialVouchers
} = require("../../controllers/PackagingMaterialSetting/index");
const router = express.Router();

router.post('/packaging-material-setting/material-vouchers/create', createMaterialVouchers);
router.get('/packaging-material-setting/material-vouchers/:userId', getMaterialVouchers);
router.put('/packaging-material-setting/material-vouchers/update/:id', updateMaterialVouchers);
router.delete('/packaging-material-setting/material-vouchers/delete/:id', deleteMaterialVouchers);
router.get('/packaging-material-setting/material-vouchers/', getAllMaterialVouchers);

module.exports = router;