import { getCatalog } from "../data/products.js";
import { html, until } from "../data/util.js";

export function catalogPage(ctx) {
  
  ctx.update()
  ctx.render(catalogTamplate(getItems()))
}

const catalogTamplate = (promise) => html`
 <section id="dashboard">
      <h2>Collectibles</h2>
      ${until(promise, html`<h1> Loading...</h1>`)}
    </section>
      `

const itemTemplate = (item) => html`
<li class="card">
          <img src=${item.imageUrl} alt="travis" />
          <p>
            <strong>Brand: </strong><span class="brand">${item.brand}</span>
          </p>
          <p>
            <strong>Model: </strong><span class="model">${item.model}</span>
          </p>
          <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
          <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>
`
async function getItems() {

  const items = await getCatalog();

  return items.length ? html`<ul class="card-wrapper">${items.map(itemTemplate)}</ul>` : html`<h2>There are no items added yet.</h2>`

}