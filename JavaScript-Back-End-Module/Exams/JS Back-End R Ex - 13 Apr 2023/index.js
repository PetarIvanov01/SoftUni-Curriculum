const express = require('express');
const routesConfig = require('./src/config/routersConfig');
const database = require('./src/config/databaseConfig');
const expressConfig = require('./src/config/expressConfig');

start();
async function start() {
    const app = express();

    expressConfig(app);
    await database(app);
    routesConfig(app);

    app.listen(3000, () => { console.log("listening on http://localhost:3000"); })
}
