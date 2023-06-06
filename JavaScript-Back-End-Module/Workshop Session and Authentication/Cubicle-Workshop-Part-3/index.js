const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/testdb';

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

    const homeControler = require('./controllers/homeControler');
    const createControler = require('./controllers/createControler');
    const detailsControler = require('./controllers/detailsControler');
    const accessoryControler = require('./controllers/accessoryControler');
    const notFoundPage = require('./controllers/notFound');

    const app = express();

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }))
    app.use('/static', express.static('static'));

    app.use(homeControler);
    app.use('/create',createControler);
    app.use('/details', detailsControler);
    app.use('/accessory',accessoryControler)
    app.use(notFoundPage);

    app.listen(3000, () => console.log('The server is running on port 3000.'));
}