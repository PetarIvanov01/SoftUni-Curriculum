const { registerUser } = require('../../services/authentication');

const router = require('express').Router();

router.get('/register', (req, res) => {

    res.render('user/register');

})

router.post('/register', async (req, res) => {
    try {
        const { username, password, repeatPassword } = req.body;
        if (username == '' || password == '') {
            throw new Error('All fields are required!');
        }
        if (password != repeatPassword) {
            throw new Error('Passwords must be the same!');
        }

        const token = await registerUser(username, password);

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/')


    } catch (error) {
        console.error(error.message);
        throw error;
    }
});

module.exports = router