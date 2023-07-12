import { editById, getById } from "../auth/offersService.js";
import { html } from "../middleware/render.js";

export async function editController(ctx) {

  const item = await getItem(ctx);
  ctx.render(template(onSubmit, item));

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const [title, imageUrl, category, description, requirements, salary] = Object.values(Object.fromEntries(formData)).map(el => el.trim());
      if (Object.values(Object.fromEntries(formData)).some(el => el == '')) {
        throw new Error('All fields are required!')
      }
      await editById(item._id,{ title, imageUrl, category, description, requirements, salary });
      ctx.page.redirect('/catalog');

    } catch (error) {

      alert(error.message);
      throw error;
    }
  }
}
const template = (onSubmit, item) => html`

<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${item.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${item.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${item.category}

              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${item.description}

              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${item.requirements}

              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${item.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

const getItem = async (ctx) => {
  try {
    const item = ctx.params.id;

    return getById(item);

  } catch (error) {
    alert(error.message);
    throw error();
  }
}