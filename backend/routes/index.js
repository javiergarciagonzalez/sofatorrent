const router = require('express').Router();

const { searchTerm } = require('../search');

router.get('/api/search/:searchTerm', async (req, res) => {
    const { searchTerm: term } = req.params;

    const result = await searchTerm(term);

    res.send(result);
});

module.exports = router;
