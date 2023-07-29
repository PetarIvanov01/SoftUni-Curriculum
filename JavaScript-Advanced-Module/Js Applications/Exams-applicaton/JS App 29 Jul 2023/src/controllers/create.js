import { createItem } from '../api/apiFacts.js';
import { html } from '../util.js'

export function createControler(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        try {
            const data = {
                category: formData.get('category'),
                imageUrl: formData.get('image-url'),
                description: formData.get('description'),
                moreInfo: formData.get('additional-info')
            }

            if (Object.values(data).some(el => el == '')) {
                throw new Error('All fields are required!')
            }

            await createItem(data);
            ctx.page.redirect('/catalog');

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}
const template = (onSubmit) => html`
<!--Create Page-->
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`