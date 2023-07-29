import { html } from '../../util.js'
import { register } from "../../api/auth.js"

export function registerControler(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const rePass = formData.get('re-password').trim();

            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }
            if (password != rePass) {
                throw new Error('Passwords must be the same!');
            }
            await register(email, password);
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message)
        }
    }
}
const template = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`