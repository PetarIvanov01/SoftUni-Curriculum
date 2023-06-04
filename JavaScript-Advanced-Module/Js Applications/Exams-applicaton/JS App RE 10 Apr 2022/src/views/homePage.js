import { getCatalog } from '../data/products.js';
import { html, until } from '../util.js'

export function homePage(ctx) {

    ctx.updateNav();
    ctx.render(tamplate(getItems()));

}
const tamplate = (promise) => html`
<section id="dashboard-page">
<h1 class="title">All Posts</h1>
        ${until(promise, html`<h1> Loading....</h1>`)}
</section>`

const itemTemplate = (item) =>html`<div class="post">
            <h2 class="post-title">${item.title}</h2>
            <img class="post-image" src=${item.imageUrl} alt="${item.title}">
            <div class="btn-wrapper">
                <a href="/details/${item._id}" class="details-btn btn">Details</a>
            </div>
        </div>
    `

async function getItems() {

    const items = await getCatalog();

    return items.length ? html`<div class="all-posts">${items.map(itemTemplate)}</div>` : html`<h1 class="title no-posts-title">No posts yet!</h1>`
}
