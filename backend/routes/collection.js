const express = require('express');
const router = express.Router();
const { addCardToCollection, getUserCollection, removeCardFromCollection } = require('../controllers/collectionController');

// Add card to collection
router.post('/add', addCardToCollection);

// Get user collection
router.get('/:userId', getUserCollection);

// Remove card from collection
router.delete('/remove', removeCardFromCollection);

module.exports = router;
