const BuyerRequest = require("../../Models/Buyercustomrequest");
 
const getApprovedBuyerRequests = async (req, res) => {
  try {
    const approvedRequests = await BuyerRequest.find({ RequestStatus: "Approved" });
   
    res.status(200).json({
      success: true,
      data: approvedRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching approved requests"
    });
  }
};
 
module.exports = getApprovedBuyerRequests;