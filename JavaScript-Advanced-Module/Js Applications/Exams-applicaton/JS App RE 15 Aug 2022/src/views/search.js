import { searchShoes } from "../data/products.js";
import { getUserData } from "../data/user.js";
import { html, until } from "../data/util.js";

let context;
export function searchPage(ctx) {

  ctx.update();
  context = ctx
  ctx.render(searchTemplate())

}

const searchTemplate = (promise = null) => html`
<section id="search">
<h2>Search by Brand</h2>

<form @submit=${onSubmit} class="search-wrapper cf">
  <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>

${until(promise, html`<h1>Loading...</h1>`)}

</section>`


async function onSubmit(event) {

  event.preventDefault();

  const formData = new FormData(event.target)
  const searchParam = formData.get('search');
  const items = await searchShoes(searchParam);
  const user = getUserData();

  context.render(searchTemplate(itemTemplate(items, user)));

}


const itemTemplate = (items, user) => html`
<div id="search-container">
  ${items.length ? html`<ul class="card-wrapper">
  ${items.map(item => html`
  <li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p>
      <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
      <strong>Model: </strong><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    ${user ? html`    <a class="details-btn" href="/details/${item._id}">Details</a>
`: null}
  </li>
  ` )}
</ul>`: html`<h2>There are no results found.</h2>`}
</div>
`
