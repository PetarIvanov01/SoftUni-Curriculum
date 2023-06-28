const { isGuest, hasUser } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../util.js/parser');

const authController = require('express').Router();


authController.get('/login', isGuest, (req, res) => {

    res.render('user/login', {
        title: 'Login Page'
    })
})

authController.get('/register', isGuest, (req, res) => {

    res.render('user/register', {
        title: 'Register Page'
    })
})

authController.post('/register', async (req, res) => {
    try {
        const { username, password, re_Password, address } = req.body;
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!');
        }
        if (password != re_Password) {
            throw new Error('Passwords must be the same!');
        }

        const payload = await register(username, password, address);

        res.cookie('user', payload).redirect('/');

    } catch (error) {
        const msg = parseError(error);
        res.render('user/register', {
            errors: msg
        })
    }


})

authController.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!');
        }
        const payload = await login(username, password);

        res.cookie('user', payload).redirect('/');

    } catch (error) {
        const msg = parseError(error);
        res.render('user/login', {
            errors: msg
        })
    }
})

authController.get('/logout', hasUser, (req, res) => {
    try {
        res.clearCookie('user');
        res.redirect('/');
    } catch (error) {
        throw error
    }
})

module.exports = authController;

