import { homeView } from "./home.js";
import { showView, updateNav } from "./data/util.js";
import { post } from "./data/api.js";

const createSec = document.querySelector('#add-movie');
const form = createSec.querySelector('form');

export function createView(nav) {

    showView(createSec);

}

form.addEventListener('submit', getMovieData);

async function getMovieData(event) {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    try {
        const userForAuth = JSON.parse(sessionStorage.getItem('user'));
        if (!userForAuth) {
            throw new Error('You are not a user!');
        }
        if (title.trim() == '' || description.trim() == '' || img.trim() == '') {
            throw new Error('All fields are required!')
        }

        await post('data/movies', { title, description, img }, userForAuth);
        form.reset();
        homeView();

    }
    catch (error) {

        alert(error.message)

    }
}

