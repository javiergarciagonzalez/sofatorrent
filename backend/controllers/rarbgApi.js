const rarbgApi = require('rarbg-api');

const fetchRarbgSearchResults = async (req, res) => {
    const keyword = req.body.search;

    const results = await rarbgApi.search(keyword);

    const parsedRestuls = results.map(result => {
        const { title, download: link, size } = result;
        return {
            title,
            link,
            size
        };
    });

    res.send(parsedRestuls);
};

module.exports = { fetchRarbgSearchResults };
