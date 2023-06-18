const router = require('express').Router();
const homeController = require('../homeController')


router.use(homeController);




module.exports = router