import { html } from "../data/util.js"
import { register } from "../user/auth.js";

export function registerPage(ctx) {

  ctx.render(registerTamplate(ctx))

}

const registerTamplate = (ctx) => html`
 <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit.bind(null, ctx)} class="login-form">
          <input type="text" name="email" id="register-email" placeholder="email" />
          <input type="password" name="password" id="register-password" placeholder="password" />
          <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
          <button type="submit">register</button>
          <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
    </section>`

async function onSubmit(ctx, event) {

  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email')
  const password = formData.get('password')

  if (email == '' || password == '') {
    return alert('All fields are required!');
  }

  await register(email, password);
  ctx.update();
  ctx.page.redirect('/');
}