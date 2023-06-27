exports.hasUser = () => {
    return (req, res, next) => {
        try {
            if (req.user == undefined) {
                throw new Error('Not autorized request');
            }
            else {
                next();
            }

        } catch (error) {
            throw error.message
        }
    }
}