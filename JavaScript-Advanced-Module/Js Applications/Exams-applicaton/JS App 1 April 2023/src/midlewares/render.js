import { render } from "../util.js";

const body = document.querySelector('main');

export function setBody(ctx, next) {

    ctx.render = (content) => render(content, body);
    next();
    
}