import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { deleteData, getDetails } from "../data/data.js";
import { getUserData } from "../data/user.js";


const detailsTemplate = (promiseData) => html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    ${until(promiseData, html`<h1>Loading...</h1>`)}
</div>
</div>
`

const itemTemplate = (data, ctx, isCreator) => html`
<div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${data.img}/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${isCreator ? controlers(data, ctx) : null}
    </div>
`

const controlers = (data, ctx) => html`<div>
<a href="/edit/${data._id}" class="btn btn-info">Edit</a>
<a href=javascript:void(0) @click=${onDelete.bind(null, data._id, ctx)} class="btn btn-red">Delete</a>
</div>`;

function isCreator(data) {

    const user = getUserData();
    return user && user.id == data._ownerId;

}

async function loadElements(id, ctx) {

    const data = await getDetails(id);
    return itemTemplate(data, ctx, isCreator(data));

}

export function showDetails(ctx) {

    const id = ctx.params.id;

    ctx.render(detailsTemplate(loadElements(id, ctx)))

}

async function onDelete(id, ctx) {
    const result = confirm('Are you sure you want to delete this item?');

    if (result == true) {
        await deleteData(id);
    }

    ctx.page.redirect('/');
}