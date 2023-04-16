import { detailsView } from "./details.js";
import { showView, spinner, updateNav } from "./util.js";

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
        detailsView(id);
    }

})

export async function getMovies() {
    const res = await fetch('http://localhost:3030/data/movies')
    const data = await res.json()

    return data
}

async function displayMovies() {

    movieSection.replaceChildren(spinner())
    const data = await getMovies();
    movieSection.replaceChildren(...data.map(createMovie))

}

function createMovie(movie) {
    let element = document.createElement('div')
    element.className = 'card mb-4';

    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="#/details/6lOxMFSMkML09wux6sAF">
                <button type="button" id="${movie._id}" class="btn btn-info">Details</button>
            </a>
        </div>
    `
    return element
}
