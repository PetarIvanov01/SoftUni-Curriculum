import { register } from '../data/products.js';
import { html } from '../util.js'

export function registerPage(ctx) {

    ctx.render(tamplate(onSubmit.bind(null, ctx)));

    async function onSubmit(ctx, event) {

        event.preventDefault();
        try {

            const formData = new FormData(event.target);;

            const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const rePass = formData.get('repeatPassword').trim();

            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }
            if (password !== rePass) {
                throw new Error('Passwords must be the same!');

            }
            await register(email, password);

            alert('You are registered successfully!');
            
            ctx.updateNav();
            ctx.page.redirect('/')

        } catch (error) {
            alert(error.message);
            throw error
        }

    }
}
const tamplate = (onSubmit) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register-page" class="auth">
    <form id="register" @submit=${onSubmit} >
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`

