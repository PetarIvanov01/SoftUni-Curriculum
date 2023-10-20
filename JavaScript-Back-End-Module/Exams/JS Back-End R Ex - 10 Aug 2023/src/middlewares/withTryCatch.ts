import { Response, Request, NextFunction, RequestHandler } from "express"
import extractMongoError from "../validations/mongoErrors";

const withTryCatch = (controller: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next)

    }
    catch (error) {
        const page = req.originalUrl.substring(1)
        let errors = [error.message];

        if (error.name === 'ValidationError') {
            errors = extractMongoError(error)
        }

        res.render(page, {
            error: errors,
            fields: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        })
    }
}

export default withTryCatch