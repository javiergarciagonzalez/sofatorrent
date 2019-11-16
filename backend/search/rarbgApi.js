const rarbgApi = require('rarbg-api');
const { bytesToSize } = require('./utils');

const fetchRarbgApi = async term => {
    const rarbgResults = await rarbgApi.search(term);

    return rarbgResults.map(result => {
        const { title, download: link, size } = result;
        return {
            title,
            link,
            size: bytesToSize(size)
        };
    });
};
module.exports = { fetchRarbgApi };
