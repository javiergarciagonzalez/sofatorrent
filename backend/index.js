/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const rarbgApi = require('rarbg-api');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

const fetchRarbgSearchResults = async (req, res) => {
    const keyword = req.body.search;

    const results = await rarbgApi.search(keyword);

    res.send(results);
};

app.post('/api/search', fetchRarbgSearchResults);
