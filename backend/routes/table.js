const express = require('express');
const router = express.Router();
const { getUserData, getCollectionData } = require('../controllers/tableController');

// Route to get User_Data table
router.get('/user-data', async (req, res) => {
    try {
        const data = await getUserData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch User_Data table' });
    }
});

// Route to get Collection table
router.get('/collection-data', async (req, res) => {
    try {
        const data = await getCollectionData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Collection table' });
    }
});

module.exports = router;
