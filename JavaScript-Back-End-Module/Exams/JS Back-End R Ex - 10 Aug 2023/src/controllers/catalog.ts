import { Router, Response, Request } from "express"

const catalogController = Router();

catalogController.get('/catalog', (req: Request, res: Response) => {
    
    res.render('catalog', {
        title: 'Catalog Page'
    })
})

export default catalogController;