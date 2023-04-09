import { renderCreateRecipe } from "./create.js";
import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";

const allPaths = {
    '/': '.home',
    '/create': '.create',
    '/login': '.login',
    '/register': '.register',
}

// export function display(path) {

//     hideContent();

//     let element = document.querySelector(allPaths[path]);
//     element.style.display = 'block';

//     router(path)

// }
function hideContent() {

    [...document.querySelectorAll('section')].forEach(el => { el.style.display = 'none' });

}
export function router(path) {

    hideContent()

    if (path == '/') {

        renderHome(allPaths[path]);

    }
    else if (path == '/create') {

        renderCreateRecipe(allPaths[path])
    }
    else if (path == '/login') {

        renderLogin(allPaths[path])

    }
    else if (path == '/register') {

        renderRegister(allPaths[path])

    }

}