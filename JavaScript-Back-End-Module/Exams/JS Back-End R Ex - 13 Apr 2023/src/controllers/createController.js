const { createItem } = require('../services/gameService');
const { parseError } = require('../util/parser');

const router = require('express').Router();

router.get('/', (req, res) => {

    res.render('create');
})

router.post('/', async (req, res) => {

    const { platform, name, image, price, genre, description } = req.body;

    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!')
        }
        const id = res.locals.user._id
        await createItem(id, { platform, name, image, price: Number(price), genre, description });

        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            body: {
                platform: req.body.platform,
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                genre: req.body.genre,
                description: req.body.description
            }
        })
    }

})



module.exports = router