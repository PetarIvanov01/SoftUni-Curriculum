const updateNav = (req, res, next) => {

    const user = req.cookies.jwt
    user ? res.locals.hasUser = true : res.locals.hasUser = false;

    next()

}
module.exports = updateNav;