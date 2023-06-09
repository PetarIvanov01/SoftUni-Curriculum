const { getById, getPopulatedAcc, deleteById, updateById } = require('../services/requests');

const router = require('express').Router();

//Show Details
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = req.user;
        const item = await getById(id);
        if (!item) {
            throw new Error('Item is invalid')
        }
        const cube = await getPopulatedAcc(id);
        let isOwner;

        if (user) {
            isOwner = item.creatorId == user.userId;
        }

        if (item == undefined) {
            res.render('404');
        }
        else {

            res.render('details', {
                isUser: user,
                isOwner,
                title: 'Details Page',
                cube: item,
                accessories: cube.accessories
            })
        }
    } catch (error) {
        if (error.message.includes('Invalid')) {
            res.redirect('/404')
        }
        console.error(error.message);
    }

});

//Show Delete
router.get('/delete/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const item = await getById(id);

        res.render('item/delete', {
            title: 'Details Page',
            cube: item,
        });

    } catch (error) {
        if (error.message.includes('Invalid')) {
            res.redirect('/404')
        }
        console.error(error.message);
    }


})

//Show Edit
router.get('/edit/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const item = await getById(id);

        res.render('item/edit', {
            title: 'Details Page',
            cube: item,
        });

    } catch (error) {
        if (error.message.includes('Invalid')) {
            res.redirect('/404')
        }
        console.error(error.message);
    }

})

//Post Delete
router.post('/delete/:id', async (req, res) => {

    try {
        const id = req.params.id
        await deleteById(id);

        res.redirect('/');

    } catch (error) {
        console.error(error);
    }

})

//Post Edit
router.post('/edit/:id', async (req, res) => {

    try {

        const currentId = req.params.id
        const body = req.body;

        const id = await updateById(currentId, body);
        res.redirect('/details/' + id);

    } catch (error) {
        console.error(error);
    }


})
module.exports = router;