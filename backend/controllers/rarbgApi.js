const rarbgApi = require('rarbg-api');
const { bytesToSize } = require('./utils');

const fetchRarbgSearchResults = async (req, res) => {
    const { searchTerm } = req.params;

    let parsedRestuls;
    try {
        const rarbgResults = await rarbgApi.search(searchTerm);
        parsedRestuls = rarbgResults.map(result => {
            const { title, download: link, size } = result;
            return {
                title,
                link,
                size: bytesToSize(size)
            };
        });
    } catch (e) {
        console.warn('Error: ', e);
        parsedRestuls = [];
    }

    res.send(parsedRestuls);
};

module.exports = { fetchRarbgSearchResults };
