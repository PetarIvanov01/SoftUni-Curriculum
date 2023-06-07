const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const token = req.cookies.token || undefined;

    try {
        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, 'secretKey');

        // Assign the decoded token to req.user
        req.user = decodedToken;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Token is invalid or expired
        return res.status(401)
    }
};


module.exports = authentication 