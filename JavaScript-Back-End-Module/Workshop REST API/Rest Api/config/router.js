const authController = require('../controllers/authController');
const itemController = require('../controllers/itemController');

module.exports = (app) =>  {

    app.use('/users', authController);
    app.use('/data', itemController);

}