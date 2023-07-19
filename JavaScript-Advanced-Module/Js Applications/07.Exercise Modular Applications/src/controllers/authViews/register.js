import { html } from "../../util.js"
import { register } from "../../user/auth.js"
export function registerController(ctx) {

    update(null, {});

    function update(errorMsg) {
        ctx.render(template(onSubmit, errorMsg));
    }

    async function onSubmit(event) {

        event.preventDefault();
        try {

            const formData = new FormData(event.target);

            const email = formData.get('email').trim();
            const username = formData.get('username').trim();
            const password = formData.get('password').trim();
            const repass = formData.get('repass').trim();

            //TODO validation
            if (email == '' || password == '' || username == '') {
                throw new Error('All fields are required!');
            }
            if (repass != password) {
                throw new Error('Passwords must be the same!');
            }

            await register(email, username, password);
            ctx.page.redirect('/');

        }
        catch (error) {
            return update(error.message);
        }
    }
}

const template = (onSubmit, error) => html`
 <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
                    ${error ? html`<div class="error">${error}</div>` : ''} 
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/auth/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>
`