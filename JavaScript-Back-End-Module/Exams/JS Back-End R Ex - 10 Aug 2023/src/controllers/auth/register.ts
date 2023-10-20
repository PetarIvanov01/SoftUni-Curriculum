import { Router, Response, Request } from "express"
import { register } from "../../services/auth";
import withTryCatch from "../../middlewares/withTryCatch";
import { RegisterInput, validateRegister } from "../../validations/authValidation";

const registerController = Router();

registerController.get('/register', (req: Request, res: Response) => {

    res.render('auth/register', {
        title: 'Register Page'
    })
})

registerController.post('/register', withTryCatch(async (req: Request, res: Response) => {

    const userData: RegisterInput = validateRegister(req.body);

    const token = await register(userData);

    res.cookie('token', token);
    res.redirect('/');

}))
export default registerController;