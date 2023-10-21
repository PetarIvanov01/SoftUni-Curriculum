const { verifyToken } = require('../services/auth')

module.exports = () => (req, res, next) => {
  
    const token = req.cookies.token;
    
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData
            res.locals.user = userData.email;
            
        } catch (error) {
            console.log('Invalid token');
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}