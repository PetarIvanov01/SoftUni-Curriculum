const express = require('express');
const expressConfig = require('./config/express');
const dataConfig = require('./config/database');
const routerConfig = require('./config/router');

start();
async function start() {

    const app = express();
    expressConfig(app);
    await dataConfig(app);
    routerConfig(app);

    app.listen(3030, () => console.log('Server is runnning on port 3030'));
}