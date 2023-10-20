import { Router, Response, Request } from "express"

const logoutController = Router();

logoutController.get('/logout', (req: Request, res: Response) => {

    res.clearCookie('token');
    res.redirect('/');
})

export default logoutController;