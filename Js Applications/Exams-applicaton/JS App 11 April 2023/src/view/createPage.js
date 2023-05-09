import { sendData } from "../data/data.js"
import { html } from "../packs.js"

export function showCreate(ctx) {

  ctx.render(catalogTemplate(onSubmit.bind(null, ctx)))

  async function onSubmit(ctx, event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    try {
      const fields = [...formData.entries()].reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: value })
      }, {})

      if (Object.values(fields).includes('')) {
        throw new Error('All fields are required!')
      }

      await sendData(fields);

      ctx.page.redirect('/catalog')
    } 
    catch (error) {
      
      alert(error.message)
      throw error
    }
  }
}


const catalogTemplate = (onSubmit) => html`<section id="create">
<div class="form" @submit=${onSubmit}>
  <h2>Add Event</h2>
  <form class="create-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Event"
    />
    <input
      type="text"
      name="imageUrl"
      id="event-image"
      placeholder="Event Image URL"
    />
    <input
      type="text"
      name="category"
      id="event-category"
      placeholder="Category"
    />


    <textarea
      id="event-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
    type="text"
    name="date"
    id="date"
    placeholder="When?"
  />

    <button type="submit">Add</button>
  </form>
</div>
</section>`