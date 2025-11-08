const createPolicy = require("./Policies/CreatePolicy")
const {getPolicies, getPolicyById} = require("./Policies/GetPolicy")
const deletePolicy = require("./Policies/DeletePolicy")
const updatePolicy = require("./Policies/UpdatePolicy")
const CreateBadge = require("./Badge/CreateBadge")
const {GetBadges, GetBadgeById} = require("./Badge/GetBadge")
const UpdateBadge = require("./Badge/EditBadge")
const getSponsoredPosts = require("./sponsor/GetSponsor")
const {getAllBadgeUsers} = require("./Badge/ShowBadgeAdmin")


module.exports = {
  createPolicy,
  getPolicies,
  getPolicyById,
  deletePolicy,
  updatePolicy,  
  CreateBadge,
  GetBadges,
  GetBadgeById,
  UpdateBadge,
  getSponsoredPosts,
  getAllBadgeUsers
};