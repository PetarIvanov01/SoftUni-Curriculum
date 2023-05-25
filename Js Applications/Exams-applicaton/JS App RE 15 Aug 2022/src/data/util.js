import { render, html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"

export { html, until }


const body = document.querySelector('main');

export function middlaware(ctx, next) {

    ctx.render = (content) => render(content, body)

    next();
}