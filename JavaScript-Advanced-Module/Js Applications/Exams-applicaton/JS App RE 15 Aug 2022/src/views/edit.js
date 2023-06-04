import { editShoe, getDetails } from "../data/products.js";
import { html, until } from "../data/util.js";

let context;
let id;
export function editPage(ctx) {
  ctx.update()

  context = ctx;
  id = ctx.params.id
  ctx.render(editTamplate(getItem()))

}

const editTamplate = (promise) => html`
 <section id="edit">
      ${until(promise, html`<h1>Loading...</h1>`)}
    </section>
      `
const createItem = (item) => html`
    <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${item.brand} />
      <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${item.model} />
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${item.imageUrl} />
      <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${item.release} />
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${item.designer} />
      <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${item.value} />

      <button type="submit">post</button>
    </form>
    </div>

`
async function getItem() {

  return createItem(await getDetails(id))
}
async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

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

  await editShoe(id, data);
  context.page.redirect('/')

}