const homeController = require("../controllers/homeController");
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

const { hasUser } = require('../middlewares/guards')

module.exports = (app) => {

    app.get('/favicon.ico', (req, res) => res.status(204))
    app.use('/', homeController);
    app.use('/user', authController);
    app.use('/gallery', hasUser, galleryController)

}