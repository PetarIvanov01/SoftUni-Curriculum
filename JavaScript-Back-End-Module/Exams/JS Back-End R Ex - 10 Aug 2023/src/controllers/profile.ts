import { Router, Response, Request } from "express"

const profileController = Router();

profileController.get('/:userId', (req: Request, res: Response) => {
    
    res.render('profile', {
        title: 'Profile Page'
    })
})

export default profileController;