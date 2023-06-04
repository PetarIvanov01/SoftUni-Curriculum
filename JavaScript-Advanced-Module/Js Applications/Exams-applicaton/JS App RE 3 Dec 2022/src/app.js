import { page } from "../src/midlewares/depen.js";
import { navigation, renderPages, userData } from "./midlewares/injectRouter.js";
import { catalogPage } from "./view/catalog.js";
import { createPage } from "./view/create.js";
import { detailsPage } from "./view/detail.js";
import { editPage } from "./view/edit.js";
import { homePage } from "./view/home.js";
import { loginPage } from "./auth/login.js";
import { registerPage } from "./auth/register.js";
import { logout } from "./data/products.js";


page(userData);
page(navigation);
page(renderPages);

page('/', homePage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/')
})







