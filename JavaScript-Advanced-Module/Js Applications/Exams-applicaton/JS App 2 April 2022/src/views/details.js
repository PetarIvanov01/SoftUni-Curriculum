import { deleteItem, getByIdDonations, getDetails, getOwnDonations, sendDonations } from '../api/apiPets.js';
import { html, until } from '../util/lib.js'

let id;
let context;
export function detailsControler(ctx) {

    id = ctx.params.id;
    context = ctx;
    ctx.render(template(getItem()));

}

const template = (promise) => html`
 <!--Details Page-->
<section id="detailsPage">
    <div class="details">
    ${until(promise, html`<div>Loading....</div>`)}
    </div>
</section>`

const itemTemplate = (item, isOwner, isUser, isDonated, total) => html`
<div class="animalPic">
            <img src="${item.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age} years</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: ${total}$</h4>
            </div>

            ${isUser ? (html` <div class="actionBtn">
        ${isOwner ? html`<a href="/edit/${item._id}" class="edit">Edit</a>
            <a href="#" @click=${onDelete} class="remove">Delete</a>`
            : isDonated ? undefined : html`<a href="#" @click=${onDonate} class="donate">Donate</a>`}
        </div>`)
        : undefined}
            </div>
        </div>`

//Geting the details for the view
async function getItem() {
    const item = await getDetails(id);
    const isOwner = context.user ? context.user.id == item._ownerId : false;
    const isUser = context.user ? true : false;

    const [isDonated, total] = await Promise.all([
        getOwnDonations(item._id, context.user.id),
        getByIdDonations(item._id)
    ])
    let totalDonations = Number(total) * 100
    return itemTemplate(item, isOwner, isUser, isDonated, totalDonations);
}

//Delete functionality
async function onDelete(event) {
    event.preventDefault();
    const conf = confirm('Are you sure you want to delete this item?');
    if (conf) {
        await deleteItem(id)
        context.page.redirect('/');
    }
}

//Donate functionality
async function onDonate(event) {
    event.preventDefault();

    await sendDonations({ petId: id });
    alert('You donate successfully');
    context.page.redirect(`/details/${id}`);
}