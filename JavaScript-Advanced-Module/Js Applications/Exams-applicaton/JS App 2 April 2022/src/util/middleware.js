import { getUserData } from '../api/user.js';
import { render } from '../util/lib.js'

const main = document.getElementById('content');

export function withRenderMiddleware(ctx, next) {

    ctx.updateNav = updateNav;
    updateNav();

    ctx.render = (content) => render(content, main);
    next();

}
export function setUser(ctx, next) {

    const user = getUserData();
    ctx.user = user;

    next();
}

function updateNav() {

    const user = getUserData();

    if (user) {
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'none')
        document.querySelectorAll('.user').forEach(el => el.style.display = 'block')
    }
    else {
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'block')
        document.querySelectorAll('.user').forEach(el => el.style.display = 'none')
    }

}