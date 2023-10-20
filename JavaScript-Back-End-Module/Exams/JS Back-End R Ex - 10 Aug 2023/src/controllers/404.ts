import { Response, Request, } from "express"

const errorHandler = (req: Request, res: Response) => {

    res.render('errors/404', {
        title: '404 page'
    })

}

export default errorHandler