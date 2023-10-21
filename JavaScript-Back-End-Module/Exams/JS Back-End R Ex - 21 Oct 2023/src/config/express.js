const express = require('express');
const handlabars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');

module.exports = (app) => {

    const hbs = handlabars.create({
        extname: '.hbs'
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.set('views', './src/views')

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    
    app.use(trimBody());
    app.use(cookieParser());
    app.use(session());
    
}