const router = require('express').Router();

router.get('/logout', (req, res) => {

    res.clearCookie('jwt');
    res.redirect('/');
})

module.exports = router;