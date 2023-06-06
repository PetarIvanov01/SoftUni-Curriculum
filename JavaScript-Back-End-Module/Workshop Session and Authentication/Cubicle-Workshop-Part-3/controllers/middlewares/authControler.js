const { getAllItems } = require('../../services/requests');
const router = require('express').Router();


router.get('/', async (req, res, next) => {

    console.log('Authent');
    req.user = 'Pesho'

    next();
})


module.exports = router