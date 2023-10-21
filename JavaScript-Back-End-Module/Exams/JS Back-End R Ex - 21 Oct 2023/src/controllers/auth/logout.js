const { hasUser } = require('../../middlewares/guards');

const logoutController = require('express').Router();

logoutController.get('/logout', hasUser(), (req, res) => {

    res.clearCookie('token');
    res.redirect('/');
})

module.exports = logoutController;