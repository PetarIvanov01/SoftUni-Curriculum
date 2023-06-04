import { getProfile } from '../data/products.js';
import { getUserData } from '../data/user.js';
import { html, until } from '../util.js'

export function myPostPage(ctx) {

    ctx.render(tamplate(getItems()));

}
const tamplate = (promise) => html`

<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

${until(promise, html`<h1>Loading...</h1>`)}        

</section>`;

const itemTemplate = (item) => html`
        <div class="post">
            <h2 class="post-title">${item.title}</h2>
            <img class="post-image" src="${item.imageUrl}" alt="${item.title}">
            <div class="btn-wrapper">
                <a href="/details/${item._id}" class="details-btn btn">Details</a>
            </div>
        </div>
`;

async function getItems() {

    const userId = getUserData().id;
    const items = await getProfile(userId);

    return items.length ? html`<div class="my-posts"> ${items.map(itemTemplate)}</div>` : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`;
}