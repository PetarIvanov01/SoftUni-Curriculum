const { getBySearch, getAllItems } = require('../services/requests');

const router = require('express').Router();

//Home Page
router.get('/', async (req, res) => {

    const items = await getAllItems()
    res.render('index', {
        title: 'Home Page',
        items: items
    })

})

//About Page
router.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page'
    });
})

//Implamant search functionallity
router.get('/search', async (req, res) => {

    const name = req.query.search.trim();
    const from = Number(req.query.from);
    const to = Number(req.query.to);

    const items = await getBySearch(name, from, to);
    const isItem = items.length ? true : false;

    res.render('search', {
        items: items,
        isItem
    })

})
module.exports = router