const getallseller = require("./Seller/getallseller");
const deleteseller=require("./Seller/deleteseller");
const getsellerproduct=require("./SellerProduct/getproduct");
const getsellerproductbyid=require("./SellerProduct/getproductbyuserid");
const sellersoldproduct=require("./SellerProduct/SellerSoldproduct");
const gettransaction=require("./Transaction/fetchtransction");
const packageingmaterialproductseller=require("./PackagingMaterial/getallpackagingmaterial")
const getsoldproductbyid=require("./SellerProduct/getsoldproductbyid")

const createOrder = require("./PackageMaterial/createOrder");
const getOrder = require("./PackageMaterial/getOrder");
const updateOrder = require("./PackageMaterial/updateOrder");
const deleteOrder = require("./PackageMaterial/deleteOrder");
const getOrderById = require("./PackageMaterial/getOrderById");
const getOrderId = require("./PackageMaterial/getOrderId");
const updateStatusById = require("./PackageMaterial/updateStatusById");

module.exports = {
  getallseller,
  deleteseller,
  getsellerproduct,
  sellersoldproduct,
  gettransaction,
  packageingmaterialproductseller,
  getsellerproductbyid,
  getsoldproductbyid,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderId,
  updateStatusById
};