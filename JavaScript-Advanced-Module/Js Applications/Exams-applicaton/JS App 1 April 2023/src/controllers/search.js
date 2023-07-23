import { searchedItems } from '../api/apiFruits.js';
import { html, until } from '../util.js'

export function searchControler(ctx) {

    update(template, onSubmit, null);

    function update(template, onSubmit, newView) {
        ctx.render(template(onSubmit, newView));
    }

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const field = formData.get('search');

            if (field.trim() == '') {
                throw new Error('Search field is requred!');
            }
            const searchItems = await searchedItems(field);
            const result = searchItems.length ? searchItems.map(itemTemplate) : html`<p class="no-result">No result.</p>`;

            update(template, onSubmit, result)
        } catch (error) {

            alert(error.message);
        }
    }
}
const template = (onSubmit, newView) => html`
<section id="search">

<div class="form">
    <h2>Search</h2>
    <form @submit=${onSubmit} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
<div class="search-result">
    ${newView ? until(newView) : ''}
</div>
</section>
`


const itemTemplate = (item) => html`
 <div class="fruit">
        <img src="${item.imageUrl}" alt="example1" />
        <h3 class="title">${item.name}</h3>
        <p class="description">${item.description}</p>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`