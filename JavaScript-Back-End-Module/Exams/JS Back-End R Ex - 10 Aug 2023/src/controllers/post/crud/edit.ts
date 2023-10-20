import { Router, Response, Request } from "express"

const editController = Router();

editController.get('/edit/:postId', (req: Request, res: Response) => {
    
    res.render('post/edit', {
        title: 'Edit Page'
    })
})

export default editController;