import { html } from "../../util.js"
import { login } from "../../api/auth.js"

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
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message)
        }
        
    }

}
const template = (onSubmit) => html`
<section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    </section>
`