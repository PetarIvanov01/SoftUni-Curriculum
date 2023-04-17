import { homeView } from './home.js';
import { showView, spinner } from './util.js';

const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
}

async function displayMovie(id) {
    section.replaceChildren(spinner());

    const user = JSON.parse(sessionStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));

}

function createMovieCard(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, ownLike)}
            <span class="enrolled-span">Liked ${likes}</span>
        </div>
    </div>`;

    const likeBtn = element.querySelector('.like-btn');
    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');

    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }
    else if (editBtn) {
        editBtn.addEventListener('click', (e) => navigateToEditMovie(e, movie))
        deleteBtn.addEventListener('click', (e) => deleteMovie(e, movie._id, user))
    }

    return element;
}

function createControls(movie, user, ownLike) {
    const isOwner = user && user._id == movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push('<a class="btn btn-danger delete-btn" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning edit-btn" href="#">Edit</a>');
    } else if (user && ownLike == false) {
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }

    return controls.join('');
}

async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}

async function likeMovie(e, movieId) {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsPage(movieId);
}

async function navigateToEditMovie(event, movie) {

    const section = document.querySelector('#edit-movie')
    showView(section)

    section.querySelector('[name="title"]').value = movie.title
    section.querySelector('[name="description"]').value = movie.description
    section.querySelector('[name="imageUrl"]').value = movie.img

    section.querySelector('form').addEventListener('submit', (e) => editMovie(e, movie))

}

async function editMovie(event, movie) {

    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, img })
    })
    detailsPage(movie._id);

}

async function deleteMovie(event, id, user) {

    await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'DELETE',
        headers: {
            "X-Authorization": user.accessToken
        }
    });

    homeView();
}