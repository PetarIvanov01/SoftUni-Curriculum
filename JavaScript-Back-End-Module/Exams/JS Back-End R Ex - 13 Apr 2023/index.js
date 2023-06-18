const express = require('express');
const router = require('./src/controllers/main/routers');
const path = require('path');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

start();
async function start() {

    const app = express();

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static(path.join(__dirname, 'src', 'static')));

    app.set('views', path.join(__dirname, 'src', 'views'));
    app.use(express.urlencoded({ extended: true }))

    //Setting all routes
    app.use(router);

    app.listen(3000, () => {
        console.log("listening on http://localhost:3000");
    })
}
