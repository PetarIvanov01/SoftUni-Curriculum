import { Response, Request, NextFunction } from "express";
import { SetSession, verifyToken } from "../services/auth";

export interface JWTRequest extends Request {
    cookies: { token: string },
    user: SetSession

}

const setUserSession = () => (req: JWTRequest, res: Response, next: NextFunction) => {

    const token = req.cookies.token;
    
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData
            res.locals.user = userData.email;
            
        } catch (error) {
            console.log('Invalid token');

            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}

export default setUserSession