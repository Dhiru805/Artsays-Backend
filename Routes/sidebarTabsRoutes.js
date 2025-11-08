const express = require('express');
const { 
    createSidebarRole,
    getSidebarRoleById,
    getSidebarByRole,
    getSidebarRoles,
    updateSidebarRole,
    deleteSidebarRole,
} = require('../controllers/SidebarTabs/index');

const router = express.Router();


router.post('/create-role', createSidebarRole);
router.get('/get-role-by-id/:id', getSidebarRoleById);
router.get('/get-role-by-role/:role', getSidebarByRole);
router.get('/get-all-role', getSidebarRoles);
router.post('/update-role/:id', updateSidebarRole);
router.delete('/delete-role/:id', deleteSidebarRole);


module.exports = router;
