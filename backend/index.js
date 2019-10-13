/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

// Setup routing
app.use('/', routes);
