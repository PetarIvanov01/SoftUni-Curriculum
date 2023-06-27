const router = require('express').Router();

router.get('/', (req, res) => {

    res.render('home', {
        title: 'Home Page'
    })

})

router.get('/catalog', (req, res) => {

    res.render('catalog', {
        title: 'Catalog Page'
    })
})

router.get('/profile', (req, res) => {

    res.render('profile',{
        title:'Profile Page'
    })
})




module.exports = router;