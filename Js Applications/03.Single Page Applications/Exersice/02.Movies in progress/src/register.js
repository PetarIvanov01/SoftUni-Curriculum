import { homeView } from "./home.js";
import { showView, updateNav } from "./data/util.js";
import { post } from "./data/api.js"

const registerSec = document.querySelector('#form-sign-up');
const form = registerSec.querySelector('form');

export function registerView(nav) {

    showView(registerSec)

}

form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');

    try {

        if (email == '' || password == '' || rePass == '') {
            throw new Error('All fields are required!')
        }

        if (password !== rePass) {
            throw new Error('Wrong re-password!')
        }

        await post('users/register', { email, password, rePass });

        form.reset();
        homeView();

    }
    catch (error) {
        alert(error.message);
    }

}
