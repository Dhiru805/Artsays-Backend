const Sidebar = require('../../Models/SidebarSchema');

const getSidebarRoles = async (req, res) => {
  try {
    const roles = await Sidebar.find().sort({ createdAt: -1 });
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching sidebar roles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getSidebarRoles;