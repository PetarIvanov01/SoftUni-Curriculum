const router = require('express').Router();

router.get('*', (req, res) => {
    const user = req.user
    console.log(user);
    res.render('404', {
        isUser: user
    });
})

module.exports = router