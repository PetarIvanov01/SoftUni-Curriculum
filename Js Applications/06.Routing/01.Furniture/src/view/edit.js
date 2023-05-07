import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { getDetails, updateData } from "../data/data.js"

export function showEdit(ctx) {

    const id = ctx.params.id
    ctx.render(editTamplete(loadItem(id, ctx)))
}

const editTamplete = (promiseData) => html`<div class="container">
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
${until(promiseData, html`<h1>Loading...</h1>`)}
</div>`

const createItem = (item, id, ctx) => html`<form @submit=${onSubmit.bind(null, id, ctx)}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class="form-control" id="new-make" type="text" name="make" .value=${item.make}>
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control " id="new-model" type="text" name="model" .value=${item.model}>
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control " id="new-year" type="number" name="year" .value=${item.year}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control" id="new-description" type="text" name="description" .value=${item.description}>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control" id="new-price" type="number" name="price" .value=${item.price}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control" id="new-image" type="text" name="img" .value=${item.img}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`

async function loadItem(id, ctx) {
    const items = await getDetails(id)
    return createItem(items, id, ctx)
}

async function onSubmit(id, ctx, event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const dataObj = [...formData.entries()].reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: value });
    }, {});

    await updateData(id, dataObj);
    ctx.page.redirect('/');
}