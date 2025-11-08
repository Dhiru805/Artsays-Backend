const Sidebar = require('../../Models/SidebarSchema');

const getSidebarByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const sidebar = await Sidebar.findOne({ role });

    if (!sidebar) {
      return res.status(404).json({ message: 'Sidebar not found for this role' });
    }

    res.status(200).json(sidebar);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getSidebarByRole;
