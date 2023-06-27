const authController = require('express').Router();


authController.get('/login', (req, res) => {

    res.render('user/login',{
        title:'Login Page'
    })
})

authController.get('/register', (req, res) => {

    res.render('user/register',{
        title:'Register Page'
    })
})


module.exports = authController;

