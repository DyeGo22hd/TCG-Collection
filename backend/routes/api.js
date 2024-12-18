const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/search-set', apiController.searchSet);

module.exports = router;
