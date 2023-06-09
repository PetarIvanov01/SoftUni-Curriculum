import page from "../node_modules/page/page.mjs";
import { logout } from "./data/products.js";
import { middlaware} from "./data/util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";


page(middlaware);
page('/', homePage);
page('/search', searchPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/')
})