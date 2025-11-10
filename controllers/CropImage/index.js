const cropImage= require("./CropImage/cropimage");
const getImage =require("./CropImage/getimages");
const editcropimage =require("./CropImage/editcropimage");
const getAllApprovedstatusproduct=require("./CropImage/getallapproveproduct");
const getApprovedProduct=require('./CropImage/getApprovedProducts');
const createShippingAddress=require("./CropImage/createShippindAddress");
const getShippingAddressesByProductId=require("./CropImage/getShippingAddressesByProductId");
const updatedefaultshippingadress=require("./CropImage/updateshippingaddressdefault");
const deleteshippingadress=require("./CropImage/deleteshippingaddress");
const getDefaultShippingAddressByProductId=require("./CropImage/getdefaultshippingAddrees");
const updateProductbyid=require("./CropImage/updateproduct")



module.exports = {
    cropImage,
    getImage,
    editcropimage,
    getAllApprovedstatusproduct,
    getApprovedProduct,
    createShippingAddress,
    getShippingAddressesByProductId,
    updatedefaultshippingadress,
    deleteshippingadress,
    getDefaultShippingAddressByProductId,
    updateProductbyid
};