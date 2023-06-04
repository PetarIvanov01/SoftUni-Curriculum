import { login } from '../data/products.js';
import { html } from '../util.js'
export function loginPage(ctx) {

    ctx.render(tamplate(onSubmit.bind(null, ctx)));

    async function onSubmit(ctx, event) {

        event.preventDefault();
        try {

            const formData = new FormData(event.target);;

            const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }
            await login(email, password);

            alert('You are logged in!');
            
            ctx.updateNav();
            ctx.page.redirect('/')


        } catch (error) {
            alert(error.message);
            throw error
        }

    }

}

const tamplate = (onSubmit) => html`
<section id="login-page" class="auth">
<form id="login" @submit=${onSubmit}>
    <h1 class="title">Login</h1>

    <article class="input-group">
        <label for="login-email">Email: </label>
        <input type="email" id="login-email" name="email">
    </article>

    <article class="input-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password">
    </article>

    <input type="submit"  class="btn submit-btn" value="Log In">
</form>
</section>`

