const { getById } = require("../../services/gameService");

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next()
        }
        else {
            res.render('404');
        }
    };
}

function isOwner() {
    return async (req, res, next) => {
        const itemId = req.params.id;
        const item = await getById(itemId);
        const owner = item.owner.toString();

        const currentUser = res.locals.user._id;

        if (currentUser == owner) {
            next();
        }
        else {
            res.render('404')
        }
    }
}

function isNotOwner() {
    return async (req, res, next) => {
        const itemId = req.params.id;
        const item = await getById(itemId);
        const owner = item.owner.toString();

        const currentUser = res.locals.user._id;

        if (currentUser == owner) {
            res.render('404')
        }
        else {
            next();

        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.render('404');
        }
        else {
            next();
        }
    };
}
module.exports = { isGuest, hasUser, isOwner, isNotOwner }