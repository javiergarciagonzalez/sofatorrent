const router = require('express').Router();

const rarbgController = require('../controllers/rarbgApi');

router.post('/api/search', rarbgController.fetchRarbgSearchResults);

module.exports = router;
