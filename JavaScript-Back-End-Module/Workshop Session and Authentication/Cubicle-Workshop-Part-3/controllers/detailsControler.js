const { getById, getPopulatedAcc } = require('../services/requests');

const router = require('express').Router();

//Show Details
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const user = req.user;
    const item = await getById(id);
    const cube = await getPopulatedAcc(id);

    if (item == undefined) {
        res.render('404');
    }
    else {

        res.render('details', {
            isUser: user,
            title: 'Details Page',
            cube: item,
            accessories: cube.accessories
        })
    }
});



module.exports = router;