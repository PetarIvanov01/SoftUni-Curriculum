import page from "../node_modules/page/page.mjs";
import { renderMiddlware } from "./middleware/render.js"
import { loginController } from "./controllers/user/login.js";
import { registerController } from "./controllers/user/register.js";
import { homeController } from "./controllers/home.js";
import { catalogController } from "./controllers/catalog.js";
import { createController } from "./controllers/create.js";
import { detailsController } from "./controllers/details.js";
import { editController } from "./controllers/edit.js";
import { logoutController } from "./controllers/user/logout.js";


page(renderMiddlware);
page('/', homeController);
page('/catalog', catalogController);
page('/create', createController);
page('/details/:id', detailsController);
page('/edit/:id', editController);
page('/auth/login', loginController);
page('/auth/register', registerController);
page('/auth/logout', logoutController);

page.start();