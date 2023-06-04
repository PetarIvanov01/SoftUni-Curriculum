import { detailsPage } from "./details.js";
import { showView, spinner, updateNav } from "./data/util.js";
import { createMovie } from "./data/dom.js";
import { get } from "./data/api.js";

const section = document.querySelector('#home-page');
const movieSection = section.querySelector('.card-deck.d-flex.justify-content-center');

export function homeView() {

    showView(section);
    displayMovies();
    updateNav();

}

movieSection.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName == 'BUTTON') {
        const id = event.target.id;
        detailsPage(id);
    }

})

async function displayMovies() {

    const movies = await get('data/movies')
    movieSection.replaceChildren(spinner())
    movieSection.replaceChildren(...movies.map(createMovie))

}

