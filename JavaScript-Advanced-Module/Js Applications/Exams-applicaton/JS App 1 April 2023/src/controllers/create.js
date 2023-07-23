import { createFruit } from '../api/apiFruits.js';
import { html } from '../util.js'

export function createControler(ctx) {

    ctx.render(template(onSubmit));

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
            await createFruit(data);
            ctx.page.redirect('/');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}
const template = (onSubmit) => html`
<!--Welcome Page-->
<section id="create">
        <div class="form">
            <h2>Add Fruit</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="name" id="name" placeholder="Fruit Name" />
                <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
                <textarea id="fruit-description" name="description" placeholder="Description" rows="10"
                    cols="50"></textarea>
                <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
                <button type="submit">Add Fruit</button>
            </form>
        </div>
    </section>
`