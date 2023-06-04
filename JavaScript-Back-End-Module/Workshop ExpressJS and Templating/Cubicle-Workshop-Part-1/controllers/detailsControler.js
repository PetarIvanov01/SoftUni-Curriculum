const { getById } = require('../services/requests');

const router = require('express').Router()

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const item = getById(id);

    if (item == undefined) {
        res.render('404');
    }
    else {

        res.render('details', {
            title: 'Details Page',
            cube: item
        })

    }

});

module.exports = router;