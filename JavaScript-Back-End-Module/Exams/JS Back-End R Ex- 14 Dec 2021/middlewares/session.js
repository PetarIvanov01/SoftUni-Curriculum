const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.user;
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.user = userData._id;

        } catch (error) {
            res.clearCookie('user');
            res.redirect('/user/login');
            return;
        }
    }
    next();
} 
