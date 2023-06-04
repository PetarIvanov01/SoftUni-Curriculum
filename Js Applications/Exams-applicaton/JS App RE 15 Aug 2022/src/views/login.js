import { login } from "../data/products.js";
import { html } from "../data/util.js";

export function loginPage(ctx) {
  ctx.update()

  ctx.render(loginTamplate(ctx))
}

const loginTamplate = (ctx) => html`
<section id="login">
      <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onSubmit.bind(null, ctx)}>
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

async function onSubmit(ctx, event) {

  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get('email').trim()
  const password = formData.get('password').trim()

  if (email == '' || password == '') {
    alert('All fields are required')
    return;
  }

  await login(email, password);

  ctx.update();
  ctx.page.redirect('/');
}