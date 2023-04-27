import { sendLogin } from "../data/users.js";

const section = document.getElementById('loginPage');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

let ctx = null;

export function showLogin(context) {

    ctx = context
    context.showView(section);

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    await sendLogin({ email, password });

    ctx.goto('/')

}