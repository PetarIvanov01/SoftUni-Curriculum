import { Router, Response, Request } from "express"
import { login } from "../../services/auth";
import { LoginInput, validateLogin } from "../../validations/authValidation";
import withTryCatch from "../../middlewares/withTryCatch";

const loginController = Router();

loginController.get('/login', (req: Request, res: Response) => {

    res.render('auth/login', {
        title: 'Login Page'
    })
})
loginController.post('/login', withTryCatch(async (req: Request, res: Response) => {

    const data = req.body;
    const userData: LoginInput = validateLogin(data)
    const token = await login(userData);

    res.cookie('token', token);
    res.redirect('/')

}))
export default loginController;