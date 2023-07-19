import { login } from "../../user/auth.js";
import { html } from "../../util.js"

export function loginController(ctx) {

    update(null);

    function update(errorMsg) {
        ctx.render(template(onSubmit, errorMsg));
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {

            const formData = new FormData(event.target);

            const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            //TODO validation
            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }

            await login(email, password);
            ctx.page.redirect('/');

        }
        catch (error) {
            return update(error.message);
        }
    }
}

const template = (onSubmit, error) => html`
 <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
                       ${error ? html`<div class="error">${error}</div>` : ''} 
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/auth/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
`