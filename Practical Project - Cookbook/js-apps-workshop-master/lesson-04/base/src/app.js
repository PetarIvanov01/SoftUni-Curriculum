// import { renderHome } from "./home.js";
import { router } from "./router.js";

const homeView = document.querySelector('.home');
const navigation = document.querySelector('.navigation');
const guest = document.querySelector('#guest');
const user = document.querySelector('#user');

guest.style.display = 'inline'
user.style.display = 'inline'

navigation.addEventListener('click', (e) => {

    e.preventDefault()

    if (e.target.tagName == 'A') {

        const url = e.target.href;
        const newUrl = new URL(url)

        router(newUrl.pathname)
    }
})