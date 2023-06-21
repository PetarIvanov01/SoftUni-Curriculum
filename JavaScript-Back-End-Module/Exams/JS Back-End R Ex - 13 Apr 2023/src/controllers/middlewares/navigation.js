const { verifyToken } = require("../../services/authentication");

module.exports = () => (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.user = userData;
        } catch (error) {
            res.clearCookie('jwt');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}