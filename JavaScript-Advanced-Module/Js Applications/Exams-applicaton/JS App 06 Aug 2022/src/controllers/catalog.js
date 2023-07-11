import { getOffers } from "../auth/offersService.js";
import { html, until } from "../middleware/render.js";

export function catalogController(ctx) {
  ctx.render(template(getItems()));

}
const template = (promise) => html`
 <section id="dashboard">
          <h2>Job Offers</h2>

          ${until(promise, html`<h4>Loading...</h4>`)}

        </section>
`

const getItems = async () => {
  const items = await getOffers();
  
  return items.length ?  items.map(itemTemplate) : html`<h2>No offers yet.</h2>`;
}

const itemTemplate = (item) => html`
 <div class="offer">
            <img src="${item.imageUrl}" alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${item.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
          </div>
`