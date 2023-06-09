const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const homeControler = require('./controllers/homeControler');
const createControler = require('./controllers/createControler');
const detailsPage = require('./controllers/detailsControler');
const notFoundPage = require('./controllers/notFound')

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('static'));

app.use(homeControler);
app.use(createControler);
app.use('/details', detailsPage);
app.use(notFoundPage);

app.listen(3000, () => console.log('The server is running on port 3000.'));