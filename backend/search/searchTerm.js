const { fetchRarbgApi } = require('./rarbgApi');

const providers = [
    {
        name: 'rarbg',
        search: fetchRarbgApi
    }
];

const searchTerm = async term => {
    const results = [];
    try {
        const parsedResults = providers.map(provider => {
            return provider.search(term);
        });

        await Promise.all(
            parsedResults.map(async (provider, index) => {
                const resolvedResult = await provider;
                results.push({
                    name: providers[index].name,
                    movies: resolvedResult
                });
            })
        );

        return results;
    } catch (e) {
        // eslint-disable-next-line
        console.warn('Error: ', e.message);
        return [];
    }
};

module.exports = searchTerm;
