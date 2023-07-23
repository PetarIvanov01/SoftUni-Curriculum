import { getUserData } from "../api/user.js";
import { html, render } from "../util.js";


const nav = document.querySelector('#nav');

export function setNavigation(ctx, next) {

    const user = getUserData();
    render(template(user), nav);
    ctx.user = user;
    
    next();
}


const template = (user) => html`    
        <div>
            <a href="/catalog">Fruits</a>
            <a href="/search">Search</a>
          </div>

          <!-- Logged-in users -->
          ${user ? html`<div class="user">
            <a href="/create">Add Fruit</a>
            <a href="/logout">Logout</a>
            </div>` :
        html`
            <!-- Guest users -->
            <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            </div>`
    }
        </div>
`