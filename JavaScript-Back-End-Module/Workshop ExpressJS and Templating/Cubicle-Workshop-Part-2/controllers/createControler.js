const router = require('express').Router();
const { createItem } = require('../services/requests')

//Create Page
router.get('/', (req, res) => {

    res.render('create', {
        title: 'Create Page'
    });
})

//Form functionallity
router.post('/', async (req, res) => {

    const body = req.body;
    const id = await createItem('cube',body);
    res.redirect('/details/' + id);

})

module.exports = router