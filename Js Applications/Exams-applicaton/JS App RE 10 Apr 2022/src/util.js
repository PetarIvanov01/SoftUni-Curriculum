import { render, html } from "../node_modules/lit-html/lit-html.js"
import { until } from "../node_modules/lit-html/directives/until.js"
import { getUserData } from "./data/user.js";

const main = document.querySelector('#main-content')
export function middleware(ctx, next) {

    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;

    next();
}
updateNav();
function updateNav() {

    const user = getUserData();
    if (user) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    }
    else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

export { html, until }