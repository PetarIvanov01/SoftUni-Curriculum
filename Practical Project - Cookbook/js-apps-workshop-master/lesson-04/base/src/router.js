import { renderCreateRecipe } from "./create.js";
import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { logout } from "./logout.js";
import { renderRegister } from "./register.js";
import { render404 } from "./render404.js";

const allPaths = {
    '/': renderHome,
    '/create': renderCreateRecipe,
    '/login': renderLogin,
    '/register': renderRegister,
    '/logout': logout,
}

export function router(path) {

    hideContent();

    const renderer = allPaths[path] || render404

    renderer()

}

function hideContent() {

    [...document.querySelectorAll('section')].forEach(el => { el.style.display = 'none' });

}

