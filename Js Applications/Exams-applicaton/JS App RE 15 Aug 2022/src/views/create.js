import { createShoe } from "../data/products.js";
import { html } from "../data/util.js";

export function createPage(ctx) {

  ctx.update()
  ctx.render(createTamplate(ctx))

}

const createTamplate = (ctx) => html`
<section id="create">
      <div class="form">
        <h2>Add item</h2>
        <form class="create-form" @submit=${onSubmit.bind(null, ctx)}>
          <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
          <input type="text" name="model" id="shoe-model" placeholder="Model" />
          <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
          <input type="text" name="release" id="shoe-release" placeholder="Release date" />
          <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
          <input type="text" name="value" id="shoe-value" placeholder="Value" />

          <button type="submit">post</button>
        </form>
      </div>
    </section>
      `


async function onSubmit(ctx, event) {

  event.preventDefault();
  const formData = new FormData(event.target)

  const data = {
    brand: formData.get('brand').trim(),
    model: formData.get('model').trim(),
    imageUrl: formData.get('imageUrl').trim(),
    release: formData.get('release').trim(),
    designer: formData.get('designer').trim(),
    value: formData.get('value').trim(),
  }
  if (Object.values(data).some(el => el == '')) {
    alert('All fields are required')
    return;
  }

  await createShoe(data)
  ctx.page.redirect('/')
}