const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const url = 'mongodb://127.0.0.1:27017/cubicalDb';

start();
async function start() {

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('The database is connected');

    const hbs = require('express-handlebars').create({
        extname: '.hbs'
    });

    const updateNav = require('./controllers/middlewares/updateNav');
    const { authentication, preAuthForDetails } = require('./controllers/middlewares/authControler');
    const homeControler = require('./controllers/homeControler');
    const createControler = require('./controllers/createControler');
    const detailsControler = require('./controllers/detailsControler');
    const accessoryControler = require('./controllers/accessoryControler');
    const loginControler = require('./controllers/AuthenticationControllers/login');
    const registerControler = require('./controllers/AuthenticationControllers/register');
    const logoutControler = require('./controllers/AuthenticationControllers/logout');
    const notFoundPage = require('./controllers/notFound');

    const app = express();

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }))
    app.use('/static', express.static('static'));

    //Util
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(cookieParser());

    //Middlewares
    app.use(updateNav);
    app.use(authentication);

    //Controlers
    app.use(homeControler);
    app.use(loginControler);
    app.use(registerControler);
    app.use(logoutControler);
    app.use('/create', preAuthForDetails, createControler);
    app.use('/details', preAuthForDetails, detailsControler);
    app.use('/accessory', preAuthForDetails, accessoryControler);
    app.use(notFoundPage);

    app.listen(3000, () => console.log('The server is running on port 3000.'));
}