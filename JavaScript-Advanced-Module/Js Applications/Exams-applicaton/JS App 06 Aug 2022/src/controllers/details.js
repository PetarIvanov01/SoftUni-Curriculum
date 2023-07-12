import { deleteOffer, doApplly, getById, getOwn, getTotal } from "../auth/offersService.js";
import { html, until } from "../middleware/render.js";

export function detailsController(ctx) {

  ctx.render(template(getItem(ctx)));

}
const template = (promise) => html`
 <section id="details">
          ${until(promise, html`<h4>Loading...</h4>`)}
        </section>
`

const itemTemplate = (item, isUser, isOwner, ctx, count, isApplied) => html`
<div id="details-wrapper">
            <img id="details-img" src="./images/example2.png" alt="example1" />
            <p id="details-title">${item.title}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${item.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${item.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${item.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">${count}</strong></p>
      ${isUser ? html`
      <div id="action-buttons">
      ${isOwner ?
      html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a href="#" @click=${onDelete.bind(null, ctx)} id="delete-btn">Delete</a>` :
      isApplied ? '' : html`<a href="#" @click=${onApplied.bind(null, ctx)} id="apply-btn">Apply</a>`}`
    : ''}
            </div>
          </div>
`

const getItem = async (ctx) => {
  try {
    const itemId = ctx.params.id
    const item = await getById(itemId);

    const isUser = ctx.user ? ctx.user.id : undefined;
    const isOwner = isUser == item._ownerId;

    const [totalCount, isApplied] = await Promise.all([

      await getTotal(itemId),
      await getOwn(itemId, isUser)

    ])
    return itemTemplate(item, isUser, isOwner, ctx, totalCount, isApplied);

  } catch (error) {
    alert(error.message);
    throw error;
  }
}

async function onDelete(ctx, event) {
  try {
    event.preventDefault();
    const conf = confirm('Are you sure you want to delete?');
    if (conf) {
      const itemId = ctx.params.id
      await deleteOffer(itemId);
      ctx.page.redirect('/catalog');
    }
    return;

  } catch (error) {
    alert(error.message);
    throw error;
  }
}

async function onApplied(ctx, event) {
  try {
    event.preventDefault();
    const offerId = ctx.params.id;

    await doApplly({ offerId });
    ctx.page.redirect(`/details/${offerId}`)

  } catch (error) {
    alert(error.message);
    throw error;
  }
}