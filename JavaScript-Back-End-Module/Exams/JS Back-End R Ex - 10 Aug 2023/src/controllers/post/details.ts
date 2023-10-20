import { Router, Response, Request } from "express"

const detailsController = Router();

detailsController.get('/details/:userId', (req: Request, res: Response) => {
    
    res.render('post/details', {
        title: 'Details Page'
    })
})

export default detailsController;