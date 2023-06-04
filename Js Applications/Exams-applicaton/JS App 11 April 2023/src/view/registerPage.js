import { onRegister } from "../data/api.js";
import { html } from "../packs.js";

export function showRegister(ctx) {

  ctx.render(registerTempalte(onSubmit.bind(null, ctx)))

  async function onSubmit(ctx, event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    try {

      const email = formData.get('email').trim();
      const password = formData.get('password').trim();
      const rePass = formData.get('re-password').trim();

      if (email == '' || password == '') {
        throw new Error('All fields are requred!');
      }
      if (rePass != password) {
        throw new Error('The passowrd doesn\'t match!');
      }

      await onRegister(email, password);
      alert('You are registerd!');

      ctx.updateNav();
      ctx.page.redirect('/');

    }
    catch (error) {
      alert(error.message)
      throw error
    }

  }
}

const registerTempalte = (onSubmit) => html`<section id="register">
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
</section>`