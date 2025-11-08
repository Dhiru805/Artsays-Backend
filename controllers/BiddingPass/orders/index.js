const list = require("./BiddingOrders/list");
const listMy = require("./BiddingOrders/listMy");
const create = require("./BiddingOrders/create");
const updateStatus = require("./BiddingOrders/updateStatus");
const remove = require("./BiddingOrders/remove");

module.exports = {
  list,
  listMy,
  create,
  updateStatus,
  remove
};
