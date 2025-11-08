const Sidebar = require('../../Models/SidebarSchema');

const getSidebarRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Sidebar.findById(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getSidebarRoleById;
