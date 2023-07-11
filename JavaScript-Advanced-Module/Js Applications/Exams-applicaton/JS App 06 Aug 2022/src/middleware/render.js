import { render, html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { getUserData } from "../auth/storage.js";

const body = document.querySelector('main');

export const renderMiddlware = (ctx, next) => {

    ctx.render = (content) => render(content, body);
    ctx.user = getUserData();
    ctx.update = updateNav;

    updateNav();
    next();
}

const updateNav = () => {
    const user = getUserData();
    
    if (user) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }
    else {
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
    }
}

export { html, until }