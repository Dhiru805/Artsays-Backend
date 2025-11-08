
const express = require("express");
const {

createCampaign,
getproductforCampagin,
getCampaignsByUser,
deleteCampaign,
updateCampaignStatus,
} = require("../controllers/Campaign/index");
const router = express.Router();


router.post('/create-campaign', createCampaign);
router.get('/campaigns/:userId', getCampaignsByUser);
router.get('/get-productfor-campagine/:userId',getproductforCampagin);
router.delete("/campaigns/:id", deleteCampaign);
router.put("/campaigns/:id", updateCampaignStatus);



module.exports = router;