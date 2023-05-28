import { register } from "../data/products.js";
import { html } from "../data/util.js";

export function registerPage(ctx) {
  ctx.update()

  ctx.render(regTamplate(ctx))

}

const regTamplate = (ctx) => html`
 <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onSubmit.bind(null, ctx)}>
          <input type="text" name="email" id="register-email" placeholder="email" />
          <input type="password" name="password" id="register-password" placeholder="password" />
          <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
          <button type="submit">login</button>
          <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
    </section>
      `

async function onSubmit(ctx, event) {

  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get('email')
  const password = formData.get('password');
  const rePass = formData.get('re-password')

  if (email == '' || password == '') {
    alert('All fields are required')
    return;
  }
  if (password !== rePass) {
    alert('Passwords must be the same!')
    return;
  }

  await register(email, password);

  ctx.update();
  ctx.page.redirect('/');
}