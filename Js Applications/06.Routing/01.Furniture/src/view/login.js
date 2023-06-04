import { html } from "../../node_modules/lit-html/lit-html.js"
import { onLogin } from "../data/api.js";


const loginTamplate = (onSubmit, errorMsg) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${'form-control' + (errorMsg ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${'form-control' + (errorMsg ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>`

export function loginPage(ctx) {

    update();

    function update(errorMSg) {
        
        ctx.render(loginTamplate(onSubmit, errorMSg));

    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {

            await onLogin(email, password);
            alert('You are Logged!');

            ctx.update();
            ctx.page.redirect('/');

        } catch (error) {
            update(error.message)
        }
    }
}

