const Sidebar = require('../../Models/SidebarSchema');

const createSidebarRole = async (req, res) => {
  try {
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

    const sidebar = new Sidebar({ role, tabs: normalizedTabs });
    const savedSidebar = await sidebar.save();

    res.status(201).json(savedSidebar);
  } catch (error) {
    console.error('Error creating sidebar role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = createSidebarRole;