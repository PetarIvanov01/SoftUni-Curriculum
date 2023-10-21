const { getOfferById } = require("../services/offer");

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/404');
        }
    };
}

function isOwner() {
    return async (req, res, next) => {

        const itemId = req.params.offerId;
        const item = await getOfferById(itemId);
        const isOwner = item.owner.toString() === req.user._id;

        if (isOwner && req.user) {
            next()
        }
        else {
            res.redirect('/404');
        }
    };
}

function notOwner() {
    return async (req, res, next) => {

        const itemId = req.params.offerId;
        const item = await getOfferById(itemId);
        const isOwner = item.owner.toString() === req.user._id;

        if (isOwner || (req.user === undefined)) {
            res.redirect('/404');

        } else {
            return next();

        }

    };
}
function isBought() {

    return async (req, res, next) => {

        const itemId = req.params.offerId;
        const item = await getOfferById(itemId);
        const isBought = item.buyingList.some(e => e._id.toString() === req.user._id);

        if (isBought || (req.user === undefined)) {
            res.redirect('/404')
        }
        else {
            next();
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/404');
        }
        else {
            next();
        }
    };
}

module.exports = { hasUser, isGuest, isOwner, notOwner, isBought }