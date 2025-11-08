
const express = require("express");
const {
 
      createSubCategory,
      createWithoutIds,
      createWithoutCategoryId,
      getAllSubCategoryByCategoryId,
      getAllSubcategory,
      getAllCategories,
      updateSubCategory,
      deleteSubCategory,
    //   updateWithoutIds,
    getallmaincategory,
    getmaincategorybyid,

    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    setArtistCategories,
} = require("../controllers/Category/index");
const router = express.Router();
// const authMiddleware = require("../Middlewares/authMiddleware");




module.exports = router;

router.post("/sub-category",createSubCategory);
router.post(
  "/sub-category-without-ids",
  createWithoutIds
);
router.post(
  "/sub-category-without-category-id",
  createWithoutCategoryId
);

// router.put("/sub-category/:id", updateWithoutIds);

router.get("/main-category",getallmaincategory)

router.get(
  "/sub-category/:categoryId",
  getAllSubCategoryByCategoryId
);
router.get(
  "/sub-category",
  getAllSubcategory
);

router.get(
    "/category/:mainCategoryId",
    getmaincategorybyid
  );

  
//used for fetching categories in homepage browse category section, created a separate controller for this.
router.get("/all", getAllCategories);


router.put(
  "/sub-category/:id",

  updateSubCategory
);
router.delete(
  "/sub-category/:id",
  deleteSubCategory
);

router.post("/createblogcategory", createBlogCategory);
router.get("/getblogcategory", getBlogCategory);
router.put("/updateblogcategory/:id", updateBlogCategory);
router.delete("/deleteblogcategory/:id", deleteBlogCategory);

router.put("/set-artist-categories", setArtistCategories);

module.exports = router;
