import { homeView } from "./home.js";
import { showView } from "./util.js";

const createSec = document.querySelector('#add-movie');
const form = createSec.querySelector('form');

export function createView() {

    showView(createSec);

}

form.addEventListener('submit', getMovieData);

async function getMovieData(event) {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('title');
    const desc = formData.get('description');
    const img = formData.get('imageUrl');

    await sendMovideReq(title, desc, img);
    form.reset();
    homeView();

}

async function sendMovideReq(title, desc, img) {

    try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            throw new Error('You are not a user!');
        }
        if (title.trim() == '' || desc.trim() == '' || img.trim() == '') {
            throw new Error('All fields are required!')
        }

        const res = await fetch('http://localhost:3030/data/movies', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": user.accessToken
            },
            body: JSON.stringify({ title, desc, img })
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

    } catch (error) {
        alert(error.message)
        throw error;
    }

}