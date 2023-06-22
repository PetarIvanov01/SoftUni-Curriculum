const router = require('express').Router();
const { getById, checkIsBought, onBought, editItem } = require('../services/gameService');
const { parseError } = require('../util/parser');
const { hasUser } = require('./middlewares/guards');

router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        let userId;

        if (res.locals.user) {
            userId = res.locals.user._id
        }
        const [item, isBought] = await Promise.all([
            getById(itemId),
            checkIsBought(userId, itemId)
        ])

        const isOwner = userId == item.owner;
        const isUser = userId != undefined ? true : false;

        res.render('details', {
            title: 'Details Page',
            item,
            isOwner,
            isUser,
            isBought
        });
    }
    catch (error) {
        throw error;
    }
})

router.get('/:id/buy', async (req, res) => {

    try {
        const itemId = req.params.id;
        let userId;

        if (res.locals.user) {
            userId = res.locals.user._id
        }
        await onBought(itemId, userId);
        res.redirect(`/details/${itemId}`)
    }
    catch (error) {
        throw error
    }

})


router.get('/edit/:id', hasUser(), async (req, res) => {

    const id = req.params.id;
    const item = await getById(id);

    res.render('edit', {
        title: 'Edit Page',
        body: item,
    })
})

router.post('/edit/:id', async (req, res) => {

    const { platform, name, image, price, genre, description } = req.body;

    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!')
        }
        const id = req.params.id
        await editItem(id, { platform, name, image, price: Number(price), genre, description });

        res.redirect(`/details/${id}`);
    } catch (error) {
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
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