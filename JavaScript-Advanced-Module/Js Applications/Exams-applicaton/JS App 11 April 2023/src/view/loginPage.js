import { onLogin } from "../data/api.js";
import { html } from "../packs.js";
export function showLogin(ctx) {

  ctx.render(loginTempalte(onSubmit.bind(null, ctx)));

  async function onSubmit(ctx, event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const email = formData.get('email').trim();
      const password = formData.get('password').trim();

      if (email == '' || password == '') {
        throw new Error('All fields are required!')
      }

      await onLogin(email, password)
      alert('You are logged');
      ctx.updateNav();
      ctx.page.redirect('/');

    } catch (error) {

      alert(error.message)
      throw error
    }

  }
}

const loginTempalte = (onSubmit) => html`
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
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`


