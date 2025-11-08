const Sidebar = require('../../Models/SidebarSchema');

const updateSidebarRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, tabs } = req.body;

    if (!role || !Array.isArray(tabs)) {
      return res.status(400).json({ message: 'Role and tabs are required' });
    }

    const normalizedTabs = tabs.map(tab => {
      const normalizedTab = {
        title: tab.title,
        tabId: tab.tabId,
        icon: tab.icon || '',
        permissions: tab.permissions ? {
          view: !!tab.permissions.view,
          create: !!tab.permissions.create,
          edit: !!tab.permissions.edit,
          delete: !!tab.permissions.delete
        } : undefined,
        subTabs: []
      };

      if (Array.isArray(tab.subTabs)) {
        normalizedTab.subTabs = tab.subTabs.map(sub => ({
          title: sub.title,
          subtabId: sub.subtabId,
          permissions: {
            view: !!sub.permissions?.view,
            create: !!sub.permissions?.create,
            edit: !!sub.permissions?.edit,
            delete: !!sub.permissions?.delete
          }
        }));
      }

      if (normalizedTab.subTabs.length > 0) {
        normalizedTab.permissions = undefined;
      }

      return normalizedTab;
    });

    const updatedSidebar = await Sidebar.findByIdAndUpdate(
      id,
      { role, tabs: normalizedTabs },
      { new: true }
    );

    if (!updatedSidebar) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(updatedSidebar);
  } catch (error) {
    console.error('Error updating sidebar role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateSidebarRole;
