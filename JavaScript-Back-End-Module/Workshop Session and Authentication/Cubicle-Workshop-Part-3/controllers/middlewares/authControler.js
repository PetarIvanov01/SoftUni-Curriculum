const jwt = require('jsonwebtoken');
const { verifToken } = require('../../services/authentication');

const key = 'secretKey'
const authentication = (req, res, next) => {
    const token = req.cookies.jwt || undefined;
    if (token) {
        try {

            const decodedToken = verifToken(token);
            req.user = decodedToken;

        } catch (error) {

            res.clearCookie('jwt');
            return res.redirect('/login')
        }
    }
    next();
};

const preAuthForDetails = (req, res, next) => {

    const user = req.user;
    try {
        if (user == undefined) {
            throw new Error('Only for users!');
        }

        next();

    }
    catch (error) {
        res.redirect('/login');
        throw error.message;
    }
}

module.exports = { authentication, preAuthForDetails } 