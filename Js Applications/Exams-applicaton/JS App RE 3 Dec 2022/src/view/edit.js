import { editProduct, getProduct } from "../data/products.js";
import { html, until } from "../midlewares/depen.js"

let context;
export function editPage(ctx) {

    context = ctx
    const id = ctx.params.id

    ctx.render(editTemplate(getItem(id)))

}

const editTemplate = (promise) => html`
<section id="edit">
     <div class="form">
        <h2>Edit Product</h2>
       ${until(promise, html`Loading...`)}
    </div>
</section>`


async function getItem(id) {

    const item = await getProduct(id);

    return itemTamplate(item, onSubmit.bind(null, id));
}

const itemTamplate = (item, onSubmit) => html` 
<form @submit=${onSubmit} class="edit-form">
<input type="text" name="name" id="name" placeholder="Product Name" .value=${item.name} />
<input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${item.imageUrl} />
<input type="text" name="category" id="product-category" placeholder="Category" .value=${item.category} />
<textarea id="product-description" name="description" placeholder="Description" rows="5"
cols="50" .value=${item.description} ></textarea>

<input type="text" name="price" id="product-price" placeholder="Price" .value=${item.price}/>
<button type="submit">post</button>
</form>
`

async function onSubmit(id, event) {
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

        await editProduct(id,body)
        context.page.redirect('/details/' + id)

    } catch (error) {
        alert(error);
        throw error
    }

}