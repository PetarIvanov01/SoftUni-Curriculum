import { homeView } from "./home.js";
import { showView, updateNav } from "./data/util.js";
import { post } from "./data/api.js";

const loginSec = document.querySelector('#form-login');
const form = loginSec.querySelector('form');

export function loginView(nav) {

    showView(loginSec)

}

form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    await post('users/login', { email, password });

    form.reset();
    homeView();
}
