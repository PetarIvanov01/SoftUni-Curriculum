const { hasUser } = require('../../middlewares/guards');
const withTryCatch = require('../../middlewares/withTryCatch');
const { searchOffers } = require('../../services/offer');

const searchController = require('express').Router();

searchController.get('/search', hasUser(), withTryCatch(async (req, res) => {

    const searchQueries = req.query;
    const noQuery = Object.keys(req.query).length !== 0
    let offers = [];

    if ((req.query.name === '' && req.query.type === '') && noQuery) {
        throw new Error('On of the fields is required!')
    }

    offers = await searchOffers(searchQueries);

    res.render('offer/search', {
        title: 'Search page',
        offers,
        search: noQuery ? undefined : {
            name: req.query?.name,
            type: req.query?.type
        }
    })

}))

module.exports = searchController;