const { notOwner, isBought } = require('../../middlewares/guards');
const { buyOffer } = require('../../services/offer');

const buyController = require('express').Router();

buyController.get('/buy/:offerId', notOwner(), isBought(), async (req, res) => {

    try {

        const offerId = req.params.offerId;
        const user = req.user?._id;

        await buyOffer(offerId, user);

        res.redirect(`/offer/details/${offerId}`)

    } catch (error) {
        console.log(error);
        throw error
    }

})
module.exports = buyController
