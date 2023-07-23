import { editById, getById } from '../api/apiFruits.js';
import { html, until } from '../util.js'

export function editControler(ctx) {
    const id = ctx.params.id
    ctx.render(template(getItem(id, onSubmit)));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        try {
            const data = {
                name: formData.get('name'),
                imageUrl: formData.get('imageUrl'),
                description: formData.get('description'),
                nutrition: formData.get('nutrition'),
            }
            if (Object.values(data).some(el => el == '')) {
                throw new Error('All fields are required!')
            }
            await editById(id,data);
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}
const template = (promise) => html`
<section id="edit">
        <div class="form">
            <h2>Edit Fruit</h2>
            ${until(promise, html`<h3>Loading...</h3>`)}
        </div>
    </section>
`

const itemTemplate = (item, onSubmit) => html`
<form @submit=${onSubmit} class="edit-form">
                <input type="text" name="name" id="name" placeholder="Fruit Name" .value=${item.name} />
                <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" .value=${item.imageUrl} />
                <textarea id="fruit-description" name="description" placeholder="Description" rows="10"
                    cols="50">${item.description}</textarea>
                <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50">${item.nutrition}</textarea>
                <button type="submit">post</button>
            </form>
`

async function getItem(id, onSubmit) {
    try {
        const item = await getById(id);

        return itemTemplate(item, onSubmit)
    } catch (error) {
        throw error
    }
}