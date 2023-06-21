const router = require('express').Router();
const { registerUser,loginUser } = require('../../services/authentication');

router.get('/login', (req, res) => {

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
        res.redirect('/');  //TODO redirect by assignment

    } catch (error) {
        // const errors = parseError(error);
        const errors = [error]
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username
            }
        })
    }

})

router.get('/register', (req, res) => {



    res.render('register');
})

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;
    try {
        if (username.trim() == '' || email.trim() == '' || password.trim() == '' || rePassword.trim() == '') {
            throw Error('All fields are required!')
        }
        const token = await registerUser(username, email, password);

        res.cookie('jwt', token);

        res.redirect('/');
    } catch (error) {

        const errors = [error];
        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                username: req.body.username
            }
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
})

module.exports = router