
const express = require("express");
const {

    createAutoTargeting,
    updateAutoTargeting,
    getAutoTargeting,
    deleteAutoTargeting,

    createGroupTargeting,
    updateGroupTargeting,
    getGroupTargeting,
    deleteGroupTargeting,

    createKeywordTargeting,
    updateKeywordTargeting,
    getKeywordTargeting,
    deleteKeywordTargeting,

    gettargetinggroupandauto,
    getallkeywordtagetingavaerage



} = require("../controllers/Targeting/index");
const router = express.Router();



//============================================Auto Targeting ===========================================//


router.post("/create-auto-targeting",createAutoTargeting);
router.put("/update-auto-targeting/:id",updateAutoTargeting);
router.get("/get-auto-targeting",getAutoTargeting);
router.delete("/delete-auto-targeting/:id",deleteAutoTargeting);

//============================================GroupTargeting ===========================================//


router.post("/create-group-targeting",createGroupTargeting);
router.put("/update-group-targeting/:id",updateGroupTargeting);
router.get("/get-group-targetings",getGroupTargeting);
router.delete("/delete-group-targeting/:id",deleteGroupTargeting);

//============================================KeywordTargeting ===========================================//


router.post("/create-keyword-targeting", createKeywordTargeting);
router.put("/update-keyword-targeting/:id", updateKeywordTargeting);
router.delete("/delete-keyword-targeting/:id", deleteKeywordTargeting);
router.get("/get-keyword-targetings",  getKeywordTargeting);
router.get("/Keyword-targeting/average/:subCategoryIds",getallkeywordtagetingavaerage);


//============================================Get AUto And group Targeting ===========================================//

router.get("/targeting-settings/average/:subCategoryIds", gettargetinggroupandauto);

module.exports = router;