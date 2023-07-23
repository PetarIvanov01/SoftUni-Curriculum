import page from "../node_modules/page/page.mjs"
import { catalogControler } from "./controllers/catalog.js";
import { createControler } from "./controllers/create.js";
import { detailsControler } from "./controllers/details.js";
import { editControler } from "./controllers/edit.js";
import { homeControler } from "./controllers/home.js";
import { searchControler } from "./controllers/search.js";
import { loginControler } from "./controllers/user/login.js";
import { logoutController } from "./controllers/user/logout.js";
import { registerControler } from "./controllers/user/register.js";
import { setNavigation } from "./midlewares/navigation.js";
import { setBody } from "./midlewares/render.js";



page(setNavigation);
page(setBody);

page('/',homeControler)
page('/search', searchControler)
page('/catalog', catalogControler)

page('/details/:id',detailsControler)
page('/edit/:id',editControler)
page('/create', createControler)

page('/login', loginControler)
page('/register',registerControler)
page('/logout', logoutController)

page.start();