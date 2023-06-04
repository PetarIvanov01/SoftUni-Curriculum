import { homeView } from "../home.js";
import { registerView } from "../register.js"
import { createView } from "../create.js"
import { loginView } from "../login.js";
import { logout } from "../logout.js";

const allView = document.querySelectorAll('.view-section')

function hideAllView() {
    allView.forEach(v => v.style.display = 'none')

}

export function showView(section) {
    hideAllView()
    section.style.display = 'block';
}


export function spinner() {
    const element = document.createElement('p');
    element.innerHTML = 'Loading &hellip;';

    return element;
}

export function updateNav() {
    
    const user = JSON.parse(sessionStorage.getItem('user'));
    const msgContaier = document.querySelector('.nav-link');

    if (user) {
        document.querySelectorAll('.user').forEach(el => el.style.display = 'inline-block')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'none')
        msgContaier.textContent = `Welcome, ${user.email}`;
    }
    else {
        document.querySelectorAll('.user').forEach(el => el.style.display = 'none')
        document.querySelectorAll('.guest').forEach(el => el.style.display = 'inline-block')
        msgContaier.textContent = '';
    }
}

export const routes = {

    '/': homeView,
    '/login': loginView,
    '/create': createView,
    '/register': registerView,
    '/logout': logout,
}


