const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

//endpoint for searching the set
router.get('/search-set', apiController.searchSet);

module.exports = router;
