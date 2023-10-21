const { isOwner, hasUser } = require('../../../middlewares/guards');
const withTryCatch = require('../../../middlewares/withTryCatch');
const { getOfferById, editOffer } = require('../../../services/offer');

const editController = require('express').Router();

editController.get('/edit/:offerId', hasUser(), isOwner(), async (req, res) => {

    const offer = await getOfferById(req.params.offerId);

    res.render('offer/edit', {
        title: 'Edit Page',
        offer
    })
})

editController.post('/edit/:offerId', hasUser(), isOwner(), withTryCatch(async (req, res) => {

    const offerId = req.params.offerId
    await editOffer(offerId, req.body);
    res.redirect(`/offer/details/${offerId}`);

}))


module.exports = editController;