const { getById, getPopulatedAcc, deleteById, updateById } = require('../services/requests');

const router = require('express').Router();

//Show Details
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = req.user;
    const item = await getById(id);
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
});

//Show Delete
router.get('/delete/:id', async (req, res) => {

    const id = req.params.id;
    const item = await getById(id);

    res.render('item/delete', {
        title: 'Details Page',
        cube: item,
    });

})

//Show Edit
router.get('/edit/:id', async (req, res) => {

    const id = req.params.id;
    const item = await getById(id);

    res.render('item/edit', {
        title: 'Details Page',
        cube: item,
    });
})

//Post Delete
router.post('/delete/:id', async (req, res) => {

    const id = req.params.id
    await deleteById(id);

    res.redirect('/');

})

//Post Edit
router.post('/edit/:id', async (req, res) => {

    const currentId = req.params.id
    const body = req.body;

    const id = await updateById(currentId, body);
    res.redirect('/details/' + id);

})
module.exports = router;