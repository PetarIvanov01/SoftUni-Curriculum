import { homeView } from "./home.js";
import { registerView } from "./register.js"
import { createView } from "./create.js"
import { loginView } from "./login.js";

const routes = {

    '/': homeView,
    '/login': loginView,
    '/create': createView,
    '/register': registerView,
    '/logout': logout,
}

const navigation = document.querySelector('nav')
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate)

navigation.addEventListener('click', onNavigate);

function onNavigate(event) {

    const target = event.target

    if (target.tagName == 'A' && target.href) {
        event.preventDefault();

        const url = new URL(target.href);
        const path = url.pathname;

        const view = routes[path]

        if (typeof view == 'function') {
            view();
        }
    }
}


function logout() {
    alert('Logged Out!!')
}

//Start app in catalog view
homeView()