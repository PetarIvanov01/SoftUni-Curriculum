const express = require('express');
const dataConfig = require('./config/database');
const routerConfig = require('./config/router')
const expressConfig = require('./config/express')

start();
async function start() {

    const app = express();
    expressConfig(app);
    await dataConfig(app);
    routerConfig(app)

    app.listen(3030, () => console.log('Server is runnning on port 3030'));
}