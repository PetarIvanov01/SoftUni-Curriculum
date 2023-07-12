import { createOffer } from "../auth/offersService.js";
import { html } from "../middleware/render.js";

export function createController(ctx) {

  ctx.render(template(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const [title, imageUrl, category, description, requirements, salary] = Object.values(Object.fromEntries(formData)).map(el => el.trim());
      if (Object.values(Object.fromEntries(formData)).some(el => el == '')) {
        throw new Error('All fields are required!')
      }
      await createOffer({ title, imageUrl, category, description, requirements, salary });
      ctx.page.redirect('/catalog');
      
    } catch (error) {

      alert(error.message);
      throw error;
    }
  }
}
const template = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`