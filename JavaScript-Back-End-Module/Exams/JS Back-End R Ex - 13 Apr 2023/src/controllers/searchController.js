const { searchGames, getAll } = require('../services/gameService');
const { hasUser } = require('./middlewares/guards');

const router = require('express').Router();

router.get('/', hasUser(), async (req, res) => {
    const games = await getAll();

    res.render('search', {
        games
    });
})

router.post('/', async (req, res) => {

    const { name, platform } = req.body;
    let games;
    if (name == '' && platform == '') {
        games = await getAll();
    }
    else {
        games = await searchGames(name, platform);
    }

    res.render('search', {
        games
    })
})

module.exports = router