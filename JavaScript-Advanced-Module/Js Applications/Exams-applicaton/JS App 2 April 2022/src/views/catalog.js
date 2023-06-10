import { getCatalog } from '../api/apiPets.js';
import { html, until } from '../util/lib.js'

export function catalogControler(ctx) {

    ctx.render(template(getItems()));

}
const template = (promise) => html`
<!--Dashboard-->
<section id="dashboard">
    ${until(promise,html`<div>Loading...</div>`)}
        </div>
    </section>
`
const itemTemplate = (item) => html`
<div class="animals-board">
                <article class="service-img">
                    <img class="animal-image-cover" src="${item.image}">
                </article>
                <h2 class="name">${item.name}</h2>
                <h3 class="breed">${item.breed}</h3>
                <div class="action">
                    <a class="btn" href="/details/${item._id}">Details</a>
                </div>
`
async function getItems() {

    const items = await getCatalog();

    return items.length ? html`
    <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${items.map(itemTemplate)}
            </div>
    `:
        html`<div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`
}