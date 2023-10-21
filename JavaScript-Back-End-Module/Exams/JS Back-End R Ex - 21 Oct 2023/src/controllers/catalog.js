const { getCatalog } = require('../services/offer');

const catalogController = require('express').Router();

catalogController.get('/catalog', async (req, res) => {

    const offers =  await getCatalog();
    res.render('catalog', {
        title: 'Catalog Page',
        offers
    })
})

module.exports = catalogController;