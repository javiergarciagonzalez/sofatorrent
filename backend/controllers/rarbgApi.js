const rarbgApi = require('rarbg-api');

const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
};

const fetchRarbgSearchResults = async (req, res) => {
    const { searchTerm } = req.params;

    const results = await rarbgApi.search(searchTerm);

    const parsedRestuls = results.map(result => {
        const { title, download: link, size } = result;
        return {
            title,
            link,
            size: bytesToSize(size)
        };
    });

    res.send(parsedRestuls);
};

module.exports = { fetchRarbgSearchResults };
