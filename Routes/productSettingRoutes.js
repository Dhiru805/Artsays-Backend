const express = require("express");
const {
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


} = require("../controllers/ProductSetting/index");
const router = express.Router();

router.post("/createproducttype", createProductType);
router.get("/getproducttype", getProductTypes);
router.put("/updateproducttype/:id", updateProductType);
router.delete("/deleteproducttype/:id", deleteProductType);



router.post("/createproductmedium", createProductMedium);
router.get("/getproductmedium", getProductMedia);
router.put("/updateproductmedium/:id", updateProductMedium);
router.delete("/deleteproductmedium/:id", deleteProductMedium);


router.post("/createproductmaterial", createProductMaterial);
router.get("/getproductmaterials", getProductMaterials);
router.put("/updateproductmaterial/:id", updateProductMaterial);
router.delete("/deleteproductmaterial/:id", deleteProductMaterial);


router.post("/createproducteditiontype", createProductEditionType);
router.get("/getproducteditiontypes", getProductEditionTypes);
router.put("/updateproducteditiontype/:id", updateProductEditionType);
router.delete("/deleteproducteditiontype/:id", deleteProductEditionType);

router.post("/createproductsurfacetype", createProductSurfaceType);
router.get("/getproductsurfacetypes", getProductSurfaceTypes);
router.put("/updateproductsurfacetype/:id", updateProductSurfaceType);
router.delete("/deleteproductsurfacetype/:id", deleteProductSurfaceType);



router.post("/createproductcouponcode", createProductCouponCode);
router.get("/getproductcouponcodes", getProductCouponCodes);
router.put("/updateproductcouponcode/:id", updateProductCouponCode);
router.delete("/deleteproductcouponcode/:id", deleteProductCouponCode);
router.get("/getproductcouponcodesbyId/:userId", getProductCouponCodesbyuserid);



router.post("/createproductpackagingtype", createProductPackagingType);
router.get("/getproductpackagingtypes", getProductPackagingTypes);
router.put("/updateproductpackagingtype/:id", updateProductPackagingType);
router.delete("/deleteproductpackagingtype/:id", deleteProductPackagingType);

router.post("/createcopyrightsrights", createCopyrightsRights);
router.get("/getcopyrightsrights", getCopyrightsRights);
router.put("/updatecopyrightsrights/:id", updateCopyrightsRights);
router.delete("/deletecopyrightsrights/:id", deleteCopyrightsRights);

router.post("/createblockchainnetwork", createBlockchainNetwork);
router.get("/getblockchainnetworks", getBlockchainNetworks);
router.put("/updateblockchainnetwork/:id", updateBlockchainNetwork);
router.delete("/deleteblockchainnetwork/:id", deleteBlockchainNetwork);

router.post("/createtokenstandard", createTokenStandard);
router.get("/gettokenstandards", getTokenStandards);
router.put("/updatetokenstandard/:id", updateTokenStandard);
router.delete("/deletetokenstandard/:id", deleteTokenStandard);

router.post("/createperiodera", createPeriodEra);
router.get("/getperioderas", getPeriodEras);
router.put("/updateperiodera/:id", updatePeriodEra);
router.delete("/deleteperiodera/:id", deletePeriodEra);


module.exports = router;