const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const authController = require('../controllers/user/authController');
const searchController = require('../controllers/searchController');
const errorController = require('../controllers/errorController');
const detailsController = require('../controllers/detailsController');

module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/create', createController);
    app.use('/search', searchController);
    app.use('/details', detailsController);
    app.use('*', errorController);
    
}