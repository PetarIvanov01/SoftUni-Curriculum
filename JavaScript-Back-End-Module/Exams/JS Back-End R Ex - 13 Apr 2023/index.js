const express = require('express');
const router = require('./src/controllers/main/routers');
const database = require('./src/database/config');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

start();
async function start() {

    const app = express();
    await database();

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.use(express.urlencoded({ extended: true }));

    app.use('/static', express.static(path.join(__dirname, 'src', 'static')));

    app.set('views', path.join(__dirname, 'src', 'views'));

    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(cookieParser());
    //Setting all routes
    app.use(router);

    app.listen(3000, () => {
        console.log("listening on http://localhost:3000");
    })
}
