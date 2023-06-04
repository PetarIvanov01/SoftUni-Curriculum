const router = require('express').Router();
const { createCub } = require('../services/requests')

router.get('/create', (req, res) => {

    res.render('create', {
        title: 'Create Page'
    });
})

router.post('/create', async (req, res) => {

    const body = req.body;
    const id = await createCub(body)
    res.redirect('/details/' + id)
})

module.exports = router