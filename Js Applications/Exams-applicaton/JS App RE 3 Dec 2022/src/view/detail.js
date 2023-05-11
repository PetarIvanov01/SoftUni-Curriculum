import { api, boughtProduct, deleteProduct, getCount, getOwnCount, getProduct } from "../data/products.js"
import { html, nothing, until } from "../midlewares/depen.js"

let context;
let countBought;
let id;
let isBouhgt;

export function detailsPage(ctx) {

  context = ctx
  id = ctx.params.id
  ctx.render(detailTemplate(getItem(id)))

}


const detailTemplate = (promise) => html`
<section id="details">
  ${until(promise, html`<p>Loading...</p>`)}
</section>`

const itemTemplate = (item, isOwner, user) => html`<div id="details-wrapper">
<img id="details-img" src=${item.imageUrl} alt="example1" />
<p id="details-title">${item.name}</p>
<p id="details-category">
  Category: <span id="categories">${item.category}</span>
</p>
<p id="details-price">
  Price: <span id="price-number">${item.price}</span>$</p>
<div id="info-wrapper">
  <div id="details-description">
    <h4>Bought: <span id="buys">${countBought}</span> times.</h4>
    <span>${item.description}</span>
  </div>
</div>
<div id="action-buttons">
  ${isOwner ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
          <a href="javascript:void(0)" @click=${onClick} id="delete-btn">Delete</a>` :
    (user ? (isBouhgt ? nothing : html`<a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`) :
      nothing)}
        </div>
  </div>`


async function getItem(id) {

  const item = await getProduct(id);
  const isOwner = context.user && context.user.id == item._ownerId;
  
  countBought = await getCount(id)
  isBouhgt = await getOwnCount(id, context.user.id);

  return itemTemplate(item, isOwner, context.user)
}

async function onClick() {

  const id = context.params.id
  await deleteProduct(id)
  context.page.redirect('/catalog')

}

async function onBuy() {

  let onBough = await boughtProduct({ productId: id });
  detailsPage(context);

}


