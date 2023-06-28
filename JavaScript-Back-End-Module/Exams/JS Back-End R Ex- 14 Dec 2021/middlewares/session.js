module.exports = () => (req, res, next) => {
    try {
        const userCookie = req.cookies.user;

        if (userCookie != undefined) {
            res.locals.user = userCookie._id;
            
            req.user = userCookie._id;
            req.token = userCookie.token;
        }

        next();

    } catch (error) {
        throw error
    }

}