const router = require('express').Router();
const { registerUser } = require('../../services/authentication');

router.get('/login', (req, res) => {

    res.render('login');
})
router.post('/login', (req, res) => {
    const { email, password } = req.body;


    res.redirect('/');
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
        console.error(error.message);
    }
})


module.exports = router