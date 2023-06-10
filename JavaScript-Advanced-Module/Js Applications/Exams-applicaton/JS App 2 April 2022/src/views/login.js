import { login } from '../api/auth.js';
import { html, render } from '../util/lib.js'

export function loginControler(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const email = formData.get('email').trim();
            const password = formData.get('password').trim();

            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }

            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message)
        }
    }
}
const template = (event) => html`
<!--Login Page-->
<section id="loginPage">
    <form class="loginForm" @submit=${event}>
        <img src="/images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`