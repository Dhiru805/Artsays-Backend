const addproduct= require("./Product/addproduct");
const updateproduct=require("./Product/updateproduct")
const getallproduct =require("./Product/getallproduct");
const getproductbyid =require("./Product/getproductbyid");
const deleteproduct =require("./Product/delete");
const createpurchase=require("./ProductPurchased/create")
const getallpurchased=require("./ProductPurchased/getallpurchased")
const gettransaction=require("./Transaction/gettramsaction")
const getartistpurchasedproductbyid=require("./ProductPurchased/getartistproduct")
const getbuyerpurchasedproductbyid=require("./ProductPurchased/getbuyerproductbyid")
const getsellerpurchasedproductbyid=require("./ProductPurchased/getsellerproductbyid")
const getartisttransactionbyid=require("./Transaction/gettramsactionartist")
const getbuyertransactionbyid=require("./Transaction/gettramsactionartistbuyer")
const getsellertransactionbyid=require("./Transaction/gettramsactionartistseller")

/** Material */
const getPackageMaterial = require("./Material/getMaterial")
const createPackageMaterial = require("./Material/createMaterial")
const updatePackageMaterial = require("./Material/updateMaterial")
const getPackageMaterialById = require("./Material/getMaterialById")
const deletePackageMaterial = require("./Material/deleteMaterial")
const getAllMaterialNames = require("./Material/getAllMaterial")

module.exports = {
    addproduct,
    getallproduct,
    getproductbyid,
    deleteproduct,
    createpurchase,
    getallpurchased,
    gettransaction,
    updateproduct,
    getartistpurchasedproductbyid,
    getbuyerpurchasedproductbyid,
    getsellerpurchasedproductbyid,
    getartisttransactionbyid,
    getbuyertransactionbyid,
    getsellertransactionbyid,
    
    /** Material */
    getPackageMaterial,
    createPackageMaterial,
    updatePackageMaterial,
    getPackageMaterialById,
    deletePackageMaterial,
    getAllMaterialNames
};