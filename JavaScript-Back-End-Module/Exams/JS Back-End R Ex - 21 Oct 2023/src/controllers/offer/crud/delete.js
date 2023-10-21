const { isOwner, hasUser } = require('../../../middlewares/guards');
const { deleteOffer } = require('../../../services/offer');

const deleteController = require('express').Router();

deleteController.get('/delete/:offerId', hasUser(), isOwner(), async (req, res) => {

    const offerId = req.params.offerId;

    await deleteOffer(offerId)

    res.redirect('/catalog')
})
module.exports = deleteController;