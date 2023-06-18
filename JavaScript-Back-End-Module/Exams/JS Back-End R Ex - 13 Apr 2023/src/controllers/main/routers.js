const router = require('express').Router();
const homeController = require('../homeController');
const catalogController = require('../catalogController');
const createController = require('../createController');
const authController = require('../user/authController');
const searchController = require('../searchController');
const errorController = require('../errorController');
const detailsController = require('../detailsController');

router.use(homeController);
router.use('/catalog', catalogController);
router.use('/create',  createController);
router.use('/auth', authController);
router.use('/search', searchController);
router.use('/details', detailsController);
router.use('*', errorController);




module.exports = router