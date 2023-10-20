import { Application } from "express";
import homeController from "../controllers/home";
import catalogController from "../controllers/catalog";
import profileController from "../controllers/profile";
import loginController from "../controllers/auth/login";
import registerController from "../controllers/auth/register";
import logoutController from "../controllers/auth/logout";
import detailsController from "../controllers/post/details";
import createController from "../controllers/post/crud/create";
import editController from "../controllers/post/crud/edit";
import deleteController from "../controllers/post/crud/delete";

const homeAndCatalogControllers = [homeController, catalogController]
const authControllers = [loginController, registerController, logoutController];
const postControllers = [detailsController, createController, editController, deleteController];

const router = (app: Application): void => {

    app.use('/', homeAndCatalogControllers);
    app.use('/auth', authControllers);
    app.use('/profile', profileController);
    app.use('/post', postControllers);


}
export default router