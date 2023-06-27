const homeController = require("../controllers/homeController");
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

module.exports = (app) => {

    app.get('/favicon.ico', (req, res) => res.status(204))
    app.use('/', homeController);
    app.use('/user', authController);
    app.use('/gallery', galleryController)

}