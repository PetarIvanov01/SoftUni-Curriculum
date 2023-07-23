import { deleteFruit, getById } from '../api/apiFruits.js';
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
const itemTemplate = (item, isOwner, onDelete) => html`
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.name}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p>${item.description}</p>
                    <p id="nutrition">Nutrition</p>
                    <p id="details-nutrition">${item.nutrition}</p>
                </div>
                <!--Edit and Delete are only for creator-->
                ${isOwner ? html`<div id="action-buttons">
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
                </div>`: ''}
                
            </div>
        </div>

`
async function getItem(ctx, id, user) {
    try {
        const item = await getById(id);
        let isOwner;
        if (user) {
            isOwner = item._ownerId == user.id
        }
        return itemTemplate(item, isOwner, onDelete.bind(null, ctx, id))
    } catch (error) {
        throw error
    }
}

async function onDelete(context, id, event) {
    event.preventDefault();
    const conf = confirm('Are you sure you want to delete this item?');
    if (conf) {
        await deleteFruit(id)
        context.page.redirect('/');
    }
}