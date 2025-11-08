const createSidebarRole = require("./createrole");
const getSidebarRoleById = require("./getrolebyid");
const getSidebarByRole = require("./getrolebyrole");
const getSidebarRoles = require("./getallrole");
const updateSidebarRole = require("./updaterole");
const deleteSidebarRole = require("./deleterole");

module.exports = {
  createSidebarRole,
  getSidebarRoleById,
  getSidebarByRole,
  getSidebarRoles,
  updateSidebarRole,
  deleteSidebarRole,
};
