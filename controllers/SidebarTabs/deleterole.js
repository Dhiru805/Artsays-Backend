const Sidebar = require('../../Models/SidebarSchema');

const deleteSidebarRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSidebar = await Sidebar.findByIdAndDelete(id);

    if (!deletedSidebar) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting sidebar role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = deleteSidebarRole;
