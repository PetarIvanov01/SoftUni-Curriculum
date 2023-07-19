import { render } from "../util.js"
import { getUserData } from "../user/token.js"

const root = document.querySelector('main');

export function attachRender(ctx, next) {

    attachUser(ctx);
    ctx.render = (content) => render(content, root);

    next();
}
function attachUser(ctx) {

    ctx.user = getUserData();

}
