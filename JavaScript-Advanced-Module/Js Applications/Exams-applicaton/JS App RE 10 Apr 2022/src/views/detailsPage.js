import { deleteById, getItemById, getTotalDon, getUserDonation, sendDonate } from '../data/products.js';
import { getUserData } from '../data/user.js';
import { html, until } from '../util.js'

let id;
let context;
export function detailsPage(ctx) {

    context = ctx
    id = ctx.params.id
    ctx.render(tamplate(getItem()));

}
const tamplate = (promise) => html`
<!-- Details Page -->
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            ${until(promise, html`<h1>Loading...</h1>`)}
        </div>
    </div>
</section>
`

const itemTemplate = (item, user, isOwner, totalDonations, isDonated) => html`
            <div class="image-wrapper">
                <img src="${item.imageUrl}" alt="${item.title}" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${totalDonations}</p>
                
                <div class="btns">

                ${isOwner ? html`<a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>`
        : (user ? (isDonated ? null : html` <a href="javascript:void(0)" @click=${onDonate} class="donate-btn btn">Donate</a>`)
            : null)}
        
                </div>
            </div>
`

async function getItem() {

    const user = getUserData();
    let isOwner;
    let isDonated;
    const [item, totalDonations] = await Promise.all([
        getItemById(id),
        getTotalDon(id),
    ])

    if (user != null) {
        isOwner = user.id == item._ownerId;
        isDonated = await getUserDonation(id, user.id)

    }
    return itemTemplate(item, user, isOwner, totalDonations, isDonated);
}

async function onDelete() {

    const agree = confirm('Are you sure you want to delete this.')
    if (agree) {

        await deleteById(id);
        alert('Item deleted successfully!');
        context.page.redirect('/');

    }
}

async function onDonate() {

    await sendDonate({ postId: id });
    detailsPage(context)
}
