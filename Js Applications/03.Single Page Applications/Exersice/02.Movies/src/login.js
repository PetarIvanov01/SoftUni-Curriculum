import { homeView } from "./home.js";
import { showView, updateNav } from "./util.js";

const loginSec = document.querySelector('#form-login');
const form = loginSec.querySelector('form');

export function loginView() {

    showView(loginSec)

}

form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    await sendLoginReq(email, password);

    form.reset();
    homeView();
    updateNav();

}

async function sendLoginReq(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        sessionStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
        alert(err.message);
        throw err;
    }
}