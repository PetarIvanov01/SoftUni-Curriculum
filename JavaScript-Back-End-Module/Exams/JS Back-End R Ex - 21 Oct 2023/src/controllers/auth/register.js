const registerController = require('express').Router();

const { isGuest } = require('../../middlewares/guards');
const withTryCatch = require('../../middlewares/withTryCatch');
const { register } = require('../../services/auth');
const { validateRegister } = require('../../validations/authValidation');

registerController.get('/register', isGuest(), (req, res) => {

    res.render('auth/register', {
        title: 'Register Page'
    })
})

registerController.post('/register', isGuest(), withTryCatch(async (req, res) => {

    const userData = validateRegister(req.body);

    const token = await register(userData);

    res.cookie('token', token);
    res.redirect('/');

}))
module.exports = registerController;