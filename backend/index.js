/* eslint-disable no-console */
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.post('/api/search', (req, res) => {
    console.log(req.params);

    res.send('hola');
});
