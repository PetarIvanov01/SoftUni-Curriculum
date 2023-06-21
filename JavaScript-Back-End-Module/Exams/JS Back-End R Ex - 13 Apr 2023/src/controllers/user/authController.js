const router = require('express').Router();
const { registerUser, loginUser } = require('../../services/authentication');
const { parseError } = require('../../util/parser');
const { hasUser, isGuest } = require('../middlewares/guards');


router.get('/login', isGuest(), (req, res) => {

    res.render('login', {
        title: 'Login Page'
    });
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == '' || password == '') {
            throw new Error('All fields are required');
        }

        const token = await loginUser(email, password)
        res.cookie('jwt', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username,
                email: req.body.email
            }
        })
    }

})

router.get('/register', isGuest(), (req, res) => {

    res.render('register', {
        title: 'Register Page'
    });
})

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;
    try {
        if (username.trim() == '' || email.trim() == '' || password.trim() == '' || rePassword.trim() == '') {
            throw new Error('All fields are required!')
        }
        if (password.trim() || rePassword.trim()) {
            throw new Error('Passwords must be the same!')
        }
        const token = await registerUser(username, email, password);

        res.cookie('jwt', token);

        res.redirect('/');
    } catch (error) {

        const errors = parseError(error);
        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                username: req.body.username,
                email: req.body.email
            }
        })
    }
})

router.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
})

module.exports = router