const express = require('express');
const { 
    CreateLive, 
    UpdateLive,
    GetLive,
} = require('../../controllers/SocialMedia/SocialMediaProfile/index');
const router = express.Router();

// POST route → create live session
router.post('/social-media/create-live', CreateLive);
router.put('/social-media/update-live/:id', UpdateLive);
router.get('/social-media/live/:streamKey', GetLive);

module.exports = router;