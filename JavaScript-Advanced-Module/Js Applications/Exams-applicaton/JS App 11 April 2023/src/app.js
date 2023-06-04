import { render } from "./packs.js";
import page from "../node_modules/page/page.mjs"
//views
import { showHome } from "./view/homePage.js";
import { showRegister } from "./view/registerPage.js";
import { showLogin } from "./view/loginPage.js";
import { showDetails } from "./view/detailsPage.js";
import { showCreate } from "./view/createPage.js";
import { showCatalog } from "./view/catalogPage.js";
import { logout } from "./data/api.js";
import { getUserData } from "./data/user.js";
import { showEdit } from "./view/editPage.js";
import { gotoFunc } from "./view/goingFunctionality.js";

updateNav();

page(middleware)

page('/', showHome)
page('/register', showRegister)
page('/login', showLogin)
page('/logout', logout)
page('/catalog', showCatalog)
page('/details/:id', showDetails)
page('/details/edit/:id', showEdit)
page('/create', showCreate)
page('/going',gotoFunc)


const main = document.querySelector('main')
page.start();

function middleware(ctx, next) {

    ctx.render = (content) => render(content, main)
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {

    const user = getUserData();

    if (user != null) {
        document.querySelector('.user').style.display = 'inline'
        document.querySelector('.guest').style.display = 'none'
    }
    else {
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'inline'
    }

}

