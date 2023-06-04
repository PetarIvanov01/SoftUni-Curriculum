import { getData } from "../data/data.js"
import { html, until } from "../packs.js"

export function showCatalog(ctx) {

  ctx.render(catalogTemplate(getElements()))

}
const catalogTemplate = (promise) => html`
        <h2>Current Events</h2>
        <section id="dashboard">
        ${until(promise, html`<p>Loading...</p>`)}  
        </section>`

const createItem = (item) =>html`
        <div class="event">
        <img src=${item.imageUrl} alt="example1" />
        <p class="title">
        ${item.name}
        </p>
        <p class="date">${item.date}</p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
        </div>
`
async function getElements() {

  const items = await getData();
  if (items.length == 0 ) {
    return html`<h4>No Events yet.</h4>`
  }
  return items.map(createItem)

}
