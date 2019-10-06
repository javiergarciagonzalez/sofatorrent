const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
