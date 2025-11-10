const createProductType = require("./ProductType/create");
const getProductTypes = require("./ProductType/getproducttypes");
const updateProductType = require("./ProductType/update");
const deleteProductType = require("./ProductType/delete");

const createProductMedium = require("./ProductMedium/create");
const getProductMedia = require("./ProductMedium/getproductmedium");
const updateProductMedium = require("./ProductMedium/update");
const deleteProductMedium = require("./ProductMedium/delete");

const createProductMaterial = require("./ProductMaterial/create");
const getProductMaterials = require("./ProductMaterial/getProductMaterials");
const updateProductMaterial = require("./ProductMaterial/update");
const deleteProductMaterial = require("./ProductMaterial/delete");

const createProductEditionType = require("./ProductEditionType/create");
const getProductEditionTypes = require("./ProductEditionType/getProductEditionType");
const updateProductEditionType = require("./ProductEditionType/update");
const deleteProductEditionType = require("./ProductEditionType/delete");

const createProductSurfaceType = require("./ProductSurfaceType/create");
const getProductSurfaceTypes = require("./ProductSurfaceType/getProductSurfaceTypes");
const updateProductSurfaceType = require("./ProductSurfaceType/update");
const deleteProductSurfaceType = require("./ProductSurfaceType/delete");

const createProductCouponCode = require("./ProductCouponCode/create");
const getProductCouponCodes = require("./ProductCouponCode/getProductCouponCodes");
const updateProductCouponCode = require("./ProductCouponCode/update");
const deleteProductCouponCode = require("./ProductCouponCode/delete");
const getProductCouponCodesbyuserid = require("./ProductCouponCode/getbyuserId");

const createProductPackagingType = require("./ProductPackagingType/create");
const getProductPackagingTypes = require("./ProductPackagingType/getProductPackagingTypes");
const updateProductPackagingType = require("./ProductPackagingType/update");
const deleteProductPackagingType = require("./ProductPackagingType/delete");

const createCopyrightsRights = require("./CopyrightsRights/create");
const getCopyrightsRights = require("./CopyrightsRights/getCopyrightsRights");
const updateCopyrightsRights = require("./CopyrightsRights/update");
const deleteCopyrightsRights = require("./CopyrightsRights/delete");

const createBlockchainNetwork = require("./BlockchainNetwork/create");
const getBlockchainNetworks = require("./BlockchainNetwork/getBlockchainNetworks");
const updateBlockchainNetwork = require("./BlockchainNetwork/update");
const deleteBlockchainNetwork = require("./BlockchainNetwork/delete");

const createTokenStandard = require("./TokenStandard/create");
const getTokenStandards = require("./TokenStandard/getTokenStandards");
const updateTokenStandard = require("./TokenStandard/update");
const deleteTokenStandard = require("./TokenStandard/delete");

const createPeriodEra = require("./PeriodEra/create");
const getPeriodEras = require("./PeriodEra/getPeriodEras");
const updatePeriodEra = require("./PeriodEra/update");
const deletePeriodEra = require("./PeriodEra/delete");

module.exports = {
  createProductType,
  getProductTypes,
  updateProductType,
  deleteProductType,

  createProductMedium,
  getProductMedia,
  updateProductMedium,
  deleteProductMedium,

  createProductMaterial,
  getProductMaterials,
  updateProductMaterial,
  deleteProductMaterial,

  createProductEditionType,
  getProductEditionTypes,
  updateProductEditionType,
  deleteProductEditionType,

  createProductSurfaceType,
  getProductSurfaceTypes,
  updateProductSurfaceType,
  deleteProductSurfaceType,

  createProductCouponCode,
  getProductCouponCodes,
  updateProductCouponCode,
  deleteProductCouponCode,
  getProductCouponCodesbyuserid,

  createProductPackagingType,
  getProductPackagingTypes,
  updateProductPackagingType,
  deleteProductPackagingType,

  createCopyrightsRights,
  getCopyrightsRights,
  updateCopyrightsRights,
  deleteCopyrightsRights,

  createBlockchainNetwork,
  getBlockchainNetworks,
  updateBlockchainNetwork,
  deleteBlockchainNetwork,

  createTokenStandard,
  getTokenStandards,
  updateTokenStandard,
  deleteTokenStandard,

  createPeriodEra,
  getPeriodEras,
  updatePeriodEra,
  deletePeriodEra
};
