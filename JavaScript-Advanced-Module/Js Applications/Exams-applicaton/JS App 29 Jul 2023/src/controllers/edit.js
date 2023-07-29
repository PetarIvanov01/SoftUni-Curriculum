import { editById, getById } from '../api/apiFacts.js';
import { html, until } from '../util.js'

export function editControler(ctx) {
    const id = ctx.params.id
    ctx.render(template(getItem(id, onSubmit)));

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
            await editById(id, data);
            ctx.page.redirect(`/details/${id}`);

        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}
const template = (promise) => html`
<!-- Section which include the itemTemplate  -->
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            ${until(promise, html`<h2>Loading...</h2>`)}
          </div>
        </section>
`

const itemTemplate = (item, onSubmit) => html`
<!-- Form Tamplate -->
<form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${item.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${item.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${item.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${item.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
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