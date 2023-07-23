import { getAll } from '../api/apiFruits.js';
import { html, until } from '../util.js'

export function catalogControler(ctx) {

    ctx.render(template(getItems()));
    
}
const template = (promise) => html`
<h2>Fruits</h2>
    ${until(promise, html`<h3>Loading...</h3>`)}
    
`


const itemTemplate = (item) => html`
<div class="fruit">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="title">${item.name}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
        </div>

`

async function getItems() {
    try {
        const items = await getAll();
        return items.length ? html`<section id="dashboard">${items.map(itemTemplate)}</section>` : html`<h2>No fruit info yet.</h2>`;

    } catch (error) {
        throw error
    }
}