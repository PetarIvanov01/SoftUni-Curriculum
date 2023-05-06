import { html } from "../../node_modules/lit-html/lit-html.js"
import { onLogin } from "../data/api.js";

export function loginPage(ctx) {

    ctx.render(loginTamplate(ctx))

}

const loginTamplate = (ctx) => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit.bind(null, ctx)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>`


async function onSubmit(ctx, event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email')
    const password = formData.get('password');

    try {

        // if (condition) {
            
        // }



        await onLogin(email, password);
        alert('You are Logged!');
        ctx.update();
        ctx.page.redirect('/')
    } catch (error) {

    }



}