const createCampaign = require("./Campaign/createCampaign");
const getproductforCampagin=require("./Campaign/getproductforcampagine");
const getCampaignsByUser=require("./Campaign/getCampaignsByUser");
const deleteCampaign=require("./Campaign/deleteCampaign");
const updateCampaignStatus=require("./Campaign/updateCampaignStatus");


module.exports = {
  createCampaign,
  getproductforCampagin,
  getCampaignsByUser,
  deleteCampaign,
  updateCampaignStatus,
};
