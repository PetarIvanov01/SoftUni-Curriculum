import { createRecipe } from "./create.js";

export function renderRecipe(data) {
    const main = document.querySelector('main');

    main.innerHTML = '';

    data.forEach(el => main.appendChild(createRecipe(el, main)));
}