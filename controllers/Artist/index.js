const updateproductstatus = require("./ArtistProduct/updateartistproductstatus");
const deleteproduct = require("./ArtistProduct/deleteproduct");
const fetchbyid = require("./ArtistProduct/fetchproductbyid");
const statusapprovedproduct = require("./ArtistProduct/fetchApprovedproduct");
const getProductbyartistid = require("./ArtistProduct/fetchproductbyartistid");
const gettranscation = require("./ArtistProduct/fetchtransction")
const packageingmaterialproduct = require("./ArtistProduct/packagingmaterialproduct")

const getallartistbuyerprodyctdetails = require("./product/getallartistbuyerprdouctdetails")
const getartistproductbyid = require("./product/getartistproductbyid")
const getartistsoldproductbyid = require("./product/getsoldproductbyid")
const updateArtistCustomRequestStatus = require("./ArtistCustomProduct/ArtistCustomRequest")
const createOrder = require("./PackageMaterial/createOrder");
const getOrder = require("./PackageMaterial/getOrder");
const updateOrder = require("./PackageMaterial/updateOrder");
const deleteOrder = require("./PackageMaterial/deleteOrder");
const getOrderById = require("./PackageMaterial/getOrderById");
const getOrderId = require("./PackageMaterial/getOrderId");
const updateStatusById = require("./PackageMaterial/updateStatusById");

module.exports = {
    updateproductstatus,
    deleteproduct,
    fetchbyid,
    statusapprovedproduct,
    getProductbyartistid,
    gettranscation,
    packageingmaterialproduct,
    getallartistbuyerprodyctdetails,
    getartistproductbyid,
    getartistsoldproductbyid,
    updateArtistCustomRequestStatus,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getOrderId,
    updateStatusById
};