import { Router, Response, Request } from "express"

const createController = Router();

createController.get('/create', (req: Request, res: Response) => {
    
    res.render('post/create', {
        title: 'Create Page'
    })
})

export default createController;