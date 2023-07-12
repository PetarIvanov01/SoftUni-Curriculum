import { login } from "../../auth/userService.js";
import { html } from "../../middleware/render.js";

export function loginController(ctx) {

  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    try {

      const formData = new FormData(event.target);
      const [email, password] = Object.values(Object.fromEntries(formData)).map(el => el.trim());

      if (email == '' || password == '') {
        throw new Error('All fields are required!');
      }

      await login(email, password);
      ctx.page.redirect('/catalog')
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  }
}
const loginTemplate = (onSubmit) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/auth/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`
