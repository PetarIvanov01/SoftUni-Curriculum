const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const token = req.cookies.jwt || undefined;
    if (token) {
        try {
            // Verify and decode the JWT token
            const decodedToken = jwt.verify(token, 'secretKey');
            // Assign the decoded token to req.user
            req.user = decodedToken;

        } catch (error) {
            // Token is invalid or expired
            res.cookie('jwt', '', { maxAge: 0 })
            return res.redirect('/login')
        }
    }
    next();
};


module.exports = authentication 