const router = require('express').Router();
const { getAll } = require('../services/gameService');
const { parseError } = require('../util/parser');

router.get('/', async (req, res) => {

    try {
        const games = await getAll();
        
        res.render('catalog', {
            title: 'Catalog Page',
            games
        });

    } catch (error) {
        const errors = parseError(error);
        res.render('catalog', {
            title: 'Catalog Page',
            errors,
        })
    }

})



module.exports = router