import { sendRegister } from "../data/users.js";

const section = document.getElementById('registerPage');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

let ctx = null

export function showRegister(context) {

    ctx = context
    context.showView(section);

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    await sendRegister({ email, password });
    
    form.reset()
    ctx.updateNav();
    ctx.goto('/')

}