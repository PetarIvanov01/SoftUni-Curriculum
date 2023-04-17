import { showView, spinner } from "./util.js";

const detailsSec = document.querySelector('#movie-example');

export function detailsView() {

    showView(detailsSec)

}
document.querySelector('#movie').addEventListener('click', onClick)

async function onClick(event) {

    const target = event.target

    if (target.tagName == 'BUTTON') {
        event.preventDefault();

        const id = target.id;

        detailsSec.replaceChildren(spinner());
        const data = await getMovie(id);
        detailsSec.replaceChildren(createMovieView(data));
    }
}

async function getMovie(id) {

    const res = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await res.json();

    return data;
}

function createMovieView(data) {

    const element = document.createElement('div');
    element.className = 'row bg-light text-dark';

    element.innerHTML = `
    <h1>Movie title: ${data.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${data.img}"
                alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${data.description}</p>
            <a class="btn btn-danger" href="#">Delete</a>
            <a class="btn btn-warning" href="#">Edit</a>
            <a class="btn btn-primary" href="#">Like</a>
            <span class="enrolled-span">Liked 1</span>
        </div>
    `;

    return element;

}

function buttonNav(id) {
    



}