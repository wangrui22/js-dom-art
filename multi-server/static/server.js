const express = require('express');
let app = express();
app.use('/', express.static('./www'));
app.listen(8080);