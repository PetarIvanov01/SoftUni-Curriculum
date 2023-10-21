const detailsController = require('express').Router();
const { getOfferById } = require('../../services/offer');

detailsController.get('/details/:offerId', async (req, res) => {

    const offerId = req.params.offerId;
    const isUser = req.user?._id

    const offer = await getOfferById(offerId)
    const owner = req.user?._id === offer.owner.toString();

    const isBought = offer.buyingList.find(e => e._id.toString() === req.user?._id);
    res.render('details', {
        title: 'Details Page',
        offer: {
            ...offer,
            owner,
            isUser,
            isBought
        }
    })
})

module.exports = detailsController;