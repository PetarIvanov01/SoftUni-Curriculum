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
module.exports = { isGuest, hasUser }