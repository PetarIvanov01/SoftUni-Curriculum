import { Router, Response, Request } from "express"

const voteController = Router();

voteController.get('/vote/:userId', (req: Request, res: Response) => {

    console.log('vote');
    return

})

export default voteController;