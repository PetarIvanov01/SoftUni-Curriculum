import { getCatalog } from "../data/requests.js"
import { html, until } from "../data/util.js"

export function catalogPage(ctx) {

  ctx.render(catalogTamplate(getData()))

}
const catalogTamplate = (promise) => html`
<section id="dashboard">
      <h2>Albums</h2>
      ${until(promise, html`<h1>Loading...</h1>`)}
    </section>`

async function getData() {
  const albums = await getCatalog();

  return albums.length ? html`<ul class="card-wrapper">${albums.map(albumTamplate)}</ul>` : html`<h2>There are no albums added yet.</h2>`
}

const albumTamplate = (info) => html`<li class="card">
<img src=${info.imageUrl} alt="travis" />
<p>
  <strong>Singer/Band: </strong><span class="singer">${info.singer}</span>
</p>
<p>
  <strong>Album name: </strong><span class="album">${info.album}</span>
</p>
<p><strong>Sales:</strong><span class="sales">${info.sales}</span></p>
<a class="details-btn" href="/details/${info._id}">Details</a>
</li>
`