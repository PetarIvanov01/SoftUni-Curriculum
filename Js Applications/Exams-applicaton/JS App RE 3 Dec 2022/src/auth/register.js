import { register } from "../data/products.js";
import { html } from "../midlewares/depen.js"


export function registerPage(ctx) {

    ctx.render(registerTamplet(onSubmit))

    async function onSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const rePass = formData.get('re-password')

        try {

            if (!password || !email) {
                throw new Error("All fields are required!");
            }
            if (password != rePass) {
                throw new Error("Password doesn\'t match!");
            }

            await register(email, password);

            event.target.reset();
            ctx.navigation()
            ctx.page.redirect("/");

        } catch (error) {
            alert(error.message)
        }

    }
}

const registerTamplet = (onSubmit) => html`
    <section id="register">
    <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="register-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
    </section>`