const router = require('express').Router();
const { loginUser } = require('../../services/authentication')

router.get('/login', (req, res) => {

    try {
        const isExist = req.session.userErr;
        req.session.userErr = null
        res.render('user/login', {
            error: isExist
        });

    } catch (error) {
        console.error(error.message);
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username.trim() == '' && password.trim() == '') {
            throw new Error('All fields are required!')
        }
        const token = await loginUser(username, password);

        res.cookie('jwt', token);
        res.redirect('/')

    } catch (error) {

        req.session.userErr = error.message
        res.redirect('/login');
    }
})
module.exports = router;