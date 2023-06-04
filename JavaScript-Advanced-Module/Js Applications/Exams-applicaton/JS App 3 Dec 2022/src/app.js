import page from "../node_modules/page/page.mjs"
import { middleware, } from "./data/util.js"
import { logout } from "./user/auth.js"
import { catalogPage } from "./views/catalog.js"
import { createPage } from "./views/create.js"
import { detailsPage } from "./views/details.js"
import { editPage } from "./views/edit.js"
import { homePage } from "./views/home.js"
import { loginPage } from "./views/login.js"
import { registerPage } from "./views/register.js"

page(middleware)
page('/', homePage)
page('/catalog', catalogPage)
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/logout',logout)
page('/create', createPage)
page('/login', loginPage)
page('/register', registerPage)


page.start();

