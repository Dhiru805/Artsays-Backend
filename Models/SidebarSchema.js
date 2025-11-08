const { required } = require('joi');
const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
  view: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
}, { _id: false });

const SubTabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtabId: { type: String, required: true},
  permissions: { type: PermissionsSchema, default: () => ({}) },
});

const TabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  tabId: { type: String, required: true},
  permissions: { type: PermissionsSchema, default: () => ({}) },
  subTabs: [SubTabSchema],
});

const SidebarSchema = new mongoose.Schema({
  role: { type: String, required: true },
  tabs: [TabSchema],
}, { timestamps: true });

module.exports = mongoose.model('Sidebar', SidebarSchema);
