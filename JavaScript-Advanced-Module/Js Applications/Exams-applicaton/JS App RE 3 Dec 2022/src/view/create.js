import { createProduct } from "../data/products.js";
import { html } from "../midlewares/depen.js"


export function createPage(ctx) {

  ctx.render(createTemplate(onSubmit))

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    Object.values(data).map(el => el.trim());

    try {
      if (Object.values(data).some((x) => x == '')) {
        throw new Error('All fields are required!')
      }
      const body = {
        name: data.name,
        imageUrl: data.imageUrl,
        category: data.category,
        description: data.description,
        price: data.price,
      }

      await createProduct(body)
      ctx.page.redirect('/catalog')

    } catch (error) {
      alert(error);
      throw error
    }

  }

}

const createTemplate = (onSubmit) => html`
<section id="create">
        <div class="form">
          <h2>Add Product</h2>
          <form @submit=${onSubmit}class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
              cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
          </form>
        </div>
      </section>`