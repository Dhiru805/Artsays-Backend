/** create controllers */
const createMaterialName = require("../PackagingMaterialSetting/MaterialName/createMaterialName");
const createMaterialCapacity = require("../PackagingMaterialSetting/Capacity/createMaterialCapacity");
const createMaterialCard = require("../PackagingMaterialSetting/Card/createMaterialCard");
const createMaterialSize = require("../PackagingMaterialSetting/MaterialSize/createMaterialSize");
const createMaterialStamp = require("../PackagingMaterialSetting/Stamp/createMaterialStamp");
const createMaterialStickers = require("../PackagingMaterialSetting/Stickers/createMaterialStickers");
const createMaterialVouchers = require("../PackagingMaterialSetting/Vouchers/createMaterialVouchers");

/** get controllers */
const getMaterialName = require("../PackagingMaterialSetting/MaterialName/getMaterialName");
const getMaterialCapacity = require("../PackagingMaterialSetting/Capacity/getMaterialCapacity");
const getMaterialCard = require("../PackagingMaterialSetting/Card/getMaterialCard");
const getMaterialSize = require("../PackagingMaterialSetting/MaterialSize/getMaterialSize");
const getMaterialStamp = require("../PackagingMaterialSetting/Stamp/getMaterialStamp");
const getMaterialStickers = require("../PackagingMaterialSetting/Stickers/getMaterialStickers");
const getMaterialVouchers = require("../PackagingMaterialSetting/Vouchers/getMaterialVouchers");
const getMaterialNameImage = require("../PackagingMaterialSetting/MaterialName/getMaterialNameImage");
const getAllMaterialVouchers = require("../PackagingMaterialSetting/Vouchers/getAllMaterialVouchers");
const getAllMaterialStickers = require("../PackagingMaterialSetting/Stickers/getAllMaterialStickers");
const getAllMaterialStamp = require("../PackagingMaterialSetting/Stamp/getAllMaterialStamp");
const getAllMaterialCard = require("../PackagingMaterialSetting/Card/getAllMaterialCard");

/** update controllers */
const updateMaterialName = require("../PackagingMaterialSetting/MaterialName/updateMaterialName");
const updateMaterialCapacity = require("../PackagingMaterialSetting/Capacity/updateMaterialCapacity");
const updateMaterialCard = require("../PackagingMaterialSetting/Card/updateMaterialCard");
const updateMaterialSize = require("../PackagingMaterialSetting/MaterialSize/updateMaterialSize");
const updateMaterialStamp = require("../PackagingMaterialSetting/Stamp/updateMaterialStamp");
const updateMaterialStickers = require("../PackagingMaterialSetting/Stickers/updateMaterialStickers");
const updateMaterialVouchers = require("../PackagingMaterialSetting/Vouchers/updateMaterialVouchers");

/** delete controllers */
const deleteMaterialCapacity = require("../PackagingMaterialSetting/Capacity/deleteMaterialCapacity");
const deleteMaterialCard = require("../PackagingMaterialSetting/Card/deleteMaterialCard");
const deleteMaterialName = require("../PackagingMaterialSetting/MaterialName/deleteMaterialName");
const deleteMaterialSize = require("../PackagingMaterialSetting/MaterialSize/deleteMaterialSize");
const deleteMaterialStamp = require("../PackagingMaterialSetting/Stamp/deleteMaterialStamp");
const deleteMaterialStickers = require("../PackagingMaterialSetting/Stickers/deleteMaterialStcikers");
const deleteMaterialVouchers = require("../PackagingMaterialSetting/Vouchers/deleteMaterialVouchers");

module.exports = {
    createMaterialName,
    createMaterialCapacity,
    createMaterialCard,
    createMaterialSize,
    createMaterialStamp,
    createMaterialStickers,
    createMaterialVouchers,
    /** get */
    getMaterialName,
    getMaterialCapacity,
    getMaterialCard, 
    getMaterialSize,  
    getMaterialStamp, 
    getMaterialStickers,
    getMaterialVouchers,
    getMaterialNameImage,
    getAllMaterialVouchers,
    getAllMaterialStickers,
    getAllMaterialStamp,
    getAllMaterialCard,
    /** update */
    updateMaterialName,
    updateMaterialCapacity,
    updateMaterialCard,
    updateMaterialSize,
    updateMaterialStamp,
    updateMaterialStickers,
    updateMaterialVouchers,
    /** delete */
    deleteMaterialCapacity,
    deleteMaterialCard,
    deleteMaterialName,
    deleteMaterialSize,
    deleteMaterialStamp,
    deleteMaterialStickers,
    deleteMaterialVouchers
};