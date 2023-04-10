import { checked } from "./auth.js";
import { createRecipe } from "./util.js";

const homeSection = document.querySelector('.home');

export function renderHome() {

    homeSection.style.display = 'block';

    informationRender()
}

async function informationRender() {

    const res = await fetch('http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg')
    const data = await res.json()
    checked();

    homeSection.innerHTML = '';
    Object.values(data).forEach(el => homeSection.appendChild(createRecipe(el)));

}



