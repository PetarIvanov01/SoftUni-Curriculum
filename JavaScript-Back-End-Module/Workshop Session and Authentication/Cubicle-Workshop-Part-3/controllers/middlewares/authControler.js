const jwt = require('jsonwebtoken')

const key = 'secretKey'
const authentication = (req, res, next) => {
    const token = req.cookies.jwt || undefined;
    if (token) {
        try {

            const decodedToken = jwt.verify(token, key);
            req.user = decodedToken;

        } catch (error) {

            res.clearCookie('jwt');
            // res.cookie('jwt', '', { maxAge: 0 })
            return res.redirect('/login')
        }
    }
    next();
};


module.exports = authentication 