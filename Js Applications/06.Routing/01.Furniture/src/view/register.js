import { html } from "../../node_modules/lit-html/lit-html.js"
import { onRegister } from "../data/api.js";
export function registerPage(ctx) {

    ctx.render(registerTamplate(ctx))

}

const registerTamplate = (ctx) => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>`

async function onSubmit(ctx, event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email')
    const password = formData.get('password');
    const rePassword = formData.get('rePass');
    

    await onRegister(email, password);
    alert('You are registerd!');
    ctx.update();
    ctx.page.redirect('/')

}