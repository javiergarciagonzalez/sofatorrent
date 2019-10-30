const router = require('express').Router();

const rarbgController = require('../controllers/rarbgApi');

router.get('/api/search/:searchTerm', rarbgController.fetchRarbgSearchResults);

module.exports = router;
