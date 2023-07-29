import { deleteItem, getAllLikes, getById, getOwnLikes, isLike } from '../api/apiFacts.js';
import { html, until } from '../util.js'

export function detailsControler(ctx) {
    const id = ctx.params.id;
    const user = ctx.user;

    ctx.render(template(getItem(ctx, id, user)));
}
const template = (promise) => html`
<section id="details">
        ${until(promise, html`<h2>Loading...</h2>`)}
    </section>
`
const itemTemplate = (item, isOwner, onDelete, user, onLike, totalLikes, isLike) => html`
<div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${item.description}
                  </p>
                   <p id ="more-info">
                   ${item.moreInfo}
                    </p>
              </div>

              <h3>Likes:<span id="likes">${totalLikes}</span></h3>
               
          <div id="action-buttons">
          ${isOwner ? html` <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="#" @click=${onDelete} id="delete-btn">Delete</a>`
        : (user ? (isLike ? '' : html`<a href="#" @click=${onLike} id="like-btn">Like</a>`) : '')}
          </div>
            </div>
        </div>
`
//Render the tamplate with the current item
async function getItem(ctx, id, user) {
    try {
        const item = await getById(id);
        let isOwner;
        let isLike;
        const totalLikes = await getAllLikes(id)

        if (user) {
            isOwner = item._ownerId == user.id;
            isLike = await getOwnLikes(id, user.id)
        }
        return itemTemplate(item, isOwner, onDelete.bind(null, ctx, id), user, onLike.bind(null, ctx, id), totalLikes, isLike);
    } catch (error) {
        throw error
    }
}

//Delete function 
async function onDelete(context, id, event) {
    event.preventDefault();
    const conf = confirm('Are you sure you want to delete this item?');
    if (conf) {
        await deleteItem(id)
        context.page.redirect('/catalog');
    }
}


async function onLike(ctx, id, event) {
    try {
        event.preventDefault();
        await isLike({ factId: id });
        ctx.page.redirect(`/details/${id}`);

    } catch (error) {
        throw error
    }
}

