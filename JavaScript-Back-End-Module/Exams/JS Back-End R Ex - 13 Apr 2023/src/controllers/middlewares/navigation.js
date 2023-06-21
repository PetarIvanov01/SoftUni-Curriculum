const { verifyToken } = require("../../services/authentication");

module.exports = (app) => (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const userData = verifyToken(token);
            res.locals.user = userData
        } catch (error) {
            res.clearCookie('jwt');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}