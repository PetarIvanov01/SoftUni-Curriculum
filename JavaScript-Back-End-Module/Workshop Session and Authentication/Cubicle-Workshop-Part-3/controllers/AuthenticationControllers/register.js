const { registerUser } = require('../../services/authentication');

const router = require('express').Router();

router.get('/register', (req, res) => {

    const isExist = req.session.userErr;
    req.session.userErr = null
    res.render('user/register', {
        error: isExist
    });

})

router.post('/register', async (req, res) => {
    try {
        const { username, password, repeatPassword } = req.body;
        if (username.trim() == '' || password.trim() == '') {
            throw new Error('All fields are required!');
        }
        if (password.trim() != repeatPassword.trim()) {
            throw new Error('Passwords must be the same!');
        }

        const token = await registerUser(username, password);

        res.cookie('jwt', token);

        res.redirect('/')

    } catch (error) {

        req.session.userErr = error.message
        res.redirect('/register');
    }
});

module.exports = router