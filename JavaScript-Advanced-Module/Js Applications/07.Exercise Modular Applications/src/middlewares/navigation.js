import { getUserData } from "../user/token.js";
import { html, render } from "../util.js"

const navHolder = document.querySelector('#titlebar');

export function showNavigation(ctx, next) {

    const user = getUserData();

    render(nav(user), navHolder);

    next();
}

const nav = (user) => html`

            <a href="/" class="site-logo">Team Manager</a>
            <nav>
                <a href="/catalog" class="action">Browse Teams</a>
                ${user ? html`
                <a href="/own/teams" class="action user">My Teams</a>
                <a href="/auth/logout" class="action user">Logout</a>`
        :
        html`
        <a href="/auth/login" class="action guest">Login</a>
                <a href="/auth/register" class="action guest">Register</a>`}
            </nav>
        `