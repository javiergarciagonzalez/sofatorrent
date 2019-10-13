const rarbgApi = require('rarbg-api');

const fetchRarbgSearchResults = async (req, res) => {
    const keyword = req.body.search;

    const results = await rarbgApi.search(keyword);

    res.send(results);
};

module.exports = { fetchRarbgSearchResults };
