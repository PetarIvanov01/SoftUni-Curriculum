function hasUser(req, res, next) {

    const user = req.user;
    if (user) {
        next();
    }
    else {
        res.render('404', {
            title: 'Error Page'
        });
    }
}

function isGuest(req, res, next) {
    
    const user = req.user;
    if (!user) {
        next();
    }
    else {
        res.render('404', {
            title: 'Error Page'
        });
    }
}

module.exports = { isGuest, hasUser }