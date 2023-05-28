import { deleteShoe, getDetails } from "../data/products.js";
import { getUserData } from "../data/user.js";
import { html, until } from "../data/util.js";

let context;

export function detailPage(ctx) {
  ctx.update()

  context = ctx
  ctx.render(detailTamplate(getItem()))

}

const detailTamplate = (promise) => html`
  <section id="details">
    ${until(promise, html`<h1>Loading....</h1>`)}
    </section>
      `

const createItem = (item, isCreator) => html`
<div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
          <img src=${item.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>Brand: <span id="details-brand">${item.brand}</span></p>
          <p>
            Model: <span id="details-model">${item.model}</span>
          </p>
          <p>Release date: <span id="details-release">${item.release}</span></p>
          <p>Designer: <span id="details-designer">${item.designer}</span></p>
          <p>Value: <span id="details-value">${item.value}</span></p>
        </div>

        ${isCreator ? html`<div id="action-buttons">
          <a href="/edit/${item._id}" id="edit-btn">Edit</a>
          <a @click=${onClick} href="javascript:void(0)" id=" delete-btn">Delete</a>
        </div>`: null}
      </div>
`
async function getItem() {

  const id = context.params.id
  const item = await getDetails(id);
  const isCreator = getUserData().id == item._ownerId;

  return createItem(item, isCreator)
}

async function onClick() {

  const id = context.params.id
  await deleteShoe(id);
  context.page.redirect('/')

}