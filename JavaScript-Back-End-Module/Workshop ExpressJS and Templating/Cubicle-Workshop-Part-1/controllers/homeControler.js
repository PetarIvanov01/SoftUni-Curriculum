const { getAllCubes, getBySearch } = require('../services/requests');

const router = require('express').Router();


router.get('/', (req, res) => {

    const items = getAllCubes();

    res.render('index', {
        title: 'Home Page',
        items: items
    })

})

router.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page'
    });
})

router.get('/search', (req, res) => {

    const name = req.query.search.trim();
    const from = Number(req.query.from);
    const to = Number(req.query.to);

    const items = getBySearch(name, from, to);
    const isItem = items.length ? true : false;

    res.render('search', {
        items: items,
        isItem
    })

})
module.exports = router