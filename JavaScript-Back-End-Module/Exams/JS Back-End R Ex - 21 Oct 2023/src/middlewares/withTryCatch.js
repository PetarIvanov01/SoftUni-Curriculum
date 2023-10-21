const extractMongoError = require("../validations/mongoErrors");

const withTryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next)
        
    }
    catch (error) {

        let page = req.originalUrl.substring(1)
        const parts = page.split('/');

        if (parts.length >= 2) {
            page = parts[0] + '/' + parts[1];
        }

        if (page.includes('?')) {
            const url = new URL(page, 'http://example.com')
            page = url.pathname.substring(1)
        }
        
        let errors = [error.message];

        if (error.name === 'ValidationError') {
            errors = extractMongoError(error)
        }

        res.render(page, {
            error: errors,
            _user: {
                email: req.body.email,
                username: req.body.username
            },
            offer: {
                name: req.body.name,
                type: req.body.type,
                damages: req.body.damages,
                image: req.body.image,
                description: req.body.description,
                production: req.body.production,
                exploitation: req.body.exploitation,
                price: req.body.price,
                _id: parts[2]
            }
        })
    }
}

module.exports = withTryCatch