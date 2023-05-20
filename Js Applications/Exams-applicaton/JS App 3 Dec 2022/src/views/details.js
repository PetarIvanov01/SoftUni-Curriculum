import { deleteItem, getAllLikes, getDetails, getOwnLikes, isLike } from "../data/requests.js"
import { html } from "../data/util.js"
import { getUserData } from "../user/token.js";

let context;
export async function detailsPage(ctx) {

    context = ctx
    let isLike;
    const id = ctx.params.id
    const user = getUserData();
    const item = await getDetails(id);

    const totalLikes = await getAllLikes(id)
    if (user != null) {
        isLike = await getOwnLikes(id, user.id)
    }

    ctx.render(detailsTemplate(item, user, totalLikes, isLike));

}

const detailsTemplate = (item, user, totalLikes, isLike) => html`
<section id="details">
    <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
        <img src=${item.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
        <p>
        <strong>Album name:</strong><span id="details-album">${item.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>
<div id="action-buttons">
    ${user ? (user.id == item._ownerId ?
        html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete.bind(null, item._id)} href="javascript:void(0)" id="delete-btn">Delete</a>` :
        (isLike ? '' : html`<a @click=${onLike.bind(null, item._id)} href="javascript:void(0)" id="like-btn">Like</a>`))
        : ''}
        </div>
      </div>
    </section>
`

async function onDelete(id) {
    await deleteItem(id);
    context.page.redirect('/catalog');

}
async function onLike(id) {
    await isLike({ albumId: id });
    context.page.redirect(`/details/${id}`);

}

