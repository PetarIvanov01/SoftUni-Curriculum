import { checked } from "./auth.js";
import { router } from "./router.js";

const navigation = document.querySelector('.navigation');

router('/');
checked();

navigation.addEventListener('click', (e) => {

    e.preventDefault()

    if (e.target.tagName == 'A') {

        const url = e.target.href;
        const newUrl = new URL(url)

        router(newUrl.pathname)
    }
})