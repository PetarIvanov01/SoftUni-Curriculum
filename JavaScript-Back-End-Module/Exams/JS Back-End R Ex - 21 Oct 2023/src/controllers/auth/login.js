const loginController = require('express').Router();

const { isGuest } = require('../../middlewares/guards');
const withTryCatch = require('../../middlewares/withTryCatch');
const { login } = require('../../services/auth');
const { validateLogin } = require('../../validations/authValidation');


loginController.get('/login', isGuest(), (req, res) => {

    res.render('auth/login', {
        title: 'Login Page'
    })
})
loginController.post('/login', isGuest(), withTryCatch(async (req, res) => {

    const data = req.body;
    const userData = validateLogin(data)
    const token = await login(userData);

    res.cookie('token', token);
    res.redirect('/')

}))

module.exports = loginController;