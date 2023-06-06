const router = require('express').Router();

router.get('/login', (req, res) => {

    console.log('login');
    res.render('user/login');
    
})


module.exports = router;