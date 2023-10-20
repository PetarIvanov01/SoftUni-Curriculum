import { Router, Response, Request } from "express"

const deleteController = Router();

deleteController.get('/delete/:postId', (req: Request, res: Response) => {
    
    console.log('delete');
    
   return
})

export default deleteController;