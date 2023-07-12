import { register } from "../../auth/userService.js";
import { html } from "../../middleware/render.js";

export function registerController(ctx) {

  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    try {

      const formData = new FormData(event.target);
      const [email, password, rePassword ] = Object.values(Object.fromEntries(formData)).map(el => el.trim());

      if (email == '' || password == '' || rePassword == '') {
        throw new Error('All fields are required!');
      }
      if (password != rePassword) {
        throw new Error('Passwords must be the same!');
      }

      await register(email, password);
      ctx.page.redirect('/catalog')
    }
    catch (error) {
      alert(error.message);
      throw error;
    }
  }
}
const registerTemplate = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="login-form">
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
              <p class="message">Already registered? <a href="/auth/login">Login</a></p>
            </form>
          </div>
        </section>`