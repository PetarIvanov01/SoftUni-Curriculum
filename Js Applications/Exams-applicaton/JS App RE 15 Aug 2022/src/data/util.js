import { render, html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { getUserData } from "./user.js";

export { html, until }

const body = document.querySelector('main');

export function middlaware(ctx, next) {

    ctx.render = (content) => render(content, body)
    ctx.update = update
    
    next();
}

function update() {

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