require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const databeseConfig = require('./config/database');
const routesConfig = require('./config/routes');


start();
async function start() {
    const app = express();

    expressConfig(app);
    await databeseConfig(app);
    routesConfig(app);

    app.listen(process.env.PORT,() => {
        return console.log(`Server running on port ${process.env.PORT}`);
    })
}