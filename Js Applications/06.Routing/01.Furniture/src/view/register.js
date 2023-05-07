import { html } from "../../node_modules/lit-html/lit-html.js"
import { onRegister } from "../data/api.js";


const registerTamplate = (onSubmit, errorMsg, errors) => html`
<div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${'form-control' + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${'form-control' + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${'form-control' + (errors.rePassword ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>`



export function registerPage(ctx) {

    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(registerTamplate(onSubmit, errorMsg, errors))
    }


    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePassword = formData.get('rePass').trim();
        
        try {

            if (email == '' || password == '') {
                throw {
                    errorMsg: new Error('All fields are required!'),
                    errors: {
                        email: email == '',
                        password: password == ''
                    }
                }
            }
            if (password !== rePassword) {
                throw {
                    errorMsg: new Error('Passwords don\'t match!'),
                    errors: {
                        password: true,
                        rePassword: true
                    }
                }
            }

            await onRegister(email, password);
            alert('You are registerd!');
            ctx.update();
            ctx.page.redirect('/')

        } catch (error) {
            const message = error.message || error.errors.message
            update(message, error.errors || {});

        }


    }

}
