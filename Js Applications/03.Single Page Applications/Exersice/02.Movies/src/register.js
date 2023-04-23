import { homeView } from "./home.js";
import { showView, updateNav } from "./util.js";


const registerSec = document.querySelector('#form-sign-up');
const form = registerSec.querySelector('form');

export function registerView() {

    showView(registerSec)

}

form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');
    await sendRegReq(email, password, rePass);

    form.reset();
    homeView();
    updateNav();

}

async function sendRegReq(email, password, rePass) {
    try {
        if (email == '' || password == '' || rePass == '') {
            throw new Error('All fields are required!')
        }
        if (password !== rePass) {
            throw new Error('Wrong re-password!')
        }
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rePass })
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