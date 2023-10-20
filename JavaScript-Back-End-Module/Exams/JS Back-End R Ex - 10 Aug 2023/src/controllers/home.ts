import { Router, Response} from "express"
import { JWTRequest } from "../middlewares/session";

const homeController = Router();

homeController.get('/', (req: JWTRequest, res: Response) => {
    
    res.render('home', {
        title: 'Home Page'
    })
})

export default homeController;