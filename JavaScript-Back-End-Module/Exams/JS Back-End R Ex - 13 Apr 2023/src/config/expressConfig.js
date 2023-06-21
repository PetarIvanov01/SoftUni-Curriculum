const express = require('express');
const handlabars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('../controllers/middlewares/navigation');
const trimBody = require('../controllers/middlewares/trimBody');

module.exports = (app) => {

    const hbs = handlabars.create({
        extname: '.hbs'
    })
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use('/static', express.static(path.join(__dirname, '..', 'static')));
    app.use(express.urlencoded({ extended: true }));
    app.use(trimBody())
    app.use(cookieParser());
    app.use(session());

}