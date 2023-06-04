import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { getUserData } from "../user/token.js"
import { logout } from "../user/auth.js"

export { html, render, until }

const root = document.querySelector('main');

export function middleware(ctx, next) {

    update();
    ctx.update = update;
    ctx.render = (content) => render(content, root);

    next();
}

function update() {
    const token = getUserData();

    if (token != null) {
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.guest').style.display = 'none'
    }
    else {
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'block'
    }
}



