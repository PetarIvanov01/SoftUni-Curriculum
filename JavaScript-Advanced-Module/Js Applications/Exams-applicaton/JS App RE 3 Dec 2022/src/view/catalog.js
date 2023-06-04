import { getProducts } from "../data/products.js";
import { html, nothing, until } from "../midlewares/depen.js"

export function catalogPage(ctx) {

  ctx.render(catalogTamplate(getItems()));

}
const catalogTamplate = (promise) => html`
<h2>Products</h2>
      <section id="dashboard">
${until(promise, html`<p>Loading...</p>`)}        
      </section>`

const itemTemplate = (item) => html`
        <div class="product">
          <img src=${item.imageUrl} alt="example1" />
          <p class="title">${item.name}</p>
          <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
          <a class="details-btn" href="/details/${item._id}">Details</a>
        </div>`

async function getItems() {
  const items = await getProducts();

  return items.length ? items.map(itemTemplate) : html`<h2>No products yet.</h2>`
}
