const { hasUser } = require('../../../middlewares/guards');
const withTryCatch = require('../../../middlewares/withTryCatch');
const { create } = require('../../../services/offer');

const createController = require('express').Router();

createController.get('/create', hasUser(), (req, res) => {

    res.render('offer/create', {
        title: 'Create Page'
    })
})

createController.post('/create', hasUser(), withTryCatch(async (req, res) => {

    const owner = req.user._id
    await create(req.body, owner);
    res.redirect('/catalog')

}))

module.exports = createController
