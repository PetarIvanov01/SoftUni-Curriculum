import { getDetails, updateData } from "../data/data.js"
import { html, until } from "../packs.js"

export function showEdit(ctx) {

    const id = ctx.params.id

    ctx.render(editTemplate(getItemData(id, onSubmit.bind(null, ctx))));


    async function onSubmit(ctx, event) {
        event.preventDefault()

        const id = ctx.params.id
        const formData = new FormData(event.target)

        try {
            const fields = [...formData.entries()].reduce((acc, [key, value]) => {
                return Object.assign(acc, { [key]: value })
            }, {})

            if (Object.values(fields).includes('')) {
                throw new Error('All fields are required!')
            }

            await updateData(id,fields);

            ctx.page.redirect(`/details/${id}`)
        }
        catch (error) {

            alert(error.message)
            throw error
        }

    }

}

const editTemplate = (promies) => html`<section id="edit">
<div class="form">
  <h2>Edit Event</h2>
  ${until(promies, html`<p>Loading...</p>`)}
</div>
</section>`

async function getItemData(id, onSubmit) {

    const item = await getDetails(id);

    return placeEditValues(item, onSubmit)

}

const placeEditValues = (item, onSubmit) => html`<form @submit=${onSubmit} class="edit-form">
<input
  type="text"
  name="name"
  id="name"
  .value=${item.name}
  placeholder="Event"
/>
<input
  type="text"
  name="imageUrl"
  id="event-image"
  .value=${item.imageUrl}
  placeholder="Event Image"
/>
<input
  type="text"
  name="category"
  id="event-category"
  .value=${item.category}
  placeholder="Category"
/>

<textarea
  id="event-description"
  name="description"
  placeholder="Description"
  .value=${item.description}
  rows="5"
  cols="50"
></textarea>

<label for="date-and-time">Event Time:</label>
<input
type="text"
name="date"
id="date"
.value=${item.date}
placeholder="When?"
/>

<button type="submit">Edit</button>
</form>`