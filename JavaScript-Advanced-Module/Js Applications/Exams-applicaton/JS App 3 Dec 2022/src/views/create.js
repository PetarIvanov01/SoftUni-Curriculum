import { createAlbum } from "../data/requests.js";
import { html } from "../data/util.js"

export function createPage(ctx) {

  ctx.render(createTamplate(ctx))

}

const createTamplate = (ctx) => html`
   <section id="create">
      <div class="form">
        <h2>Add Album</h2>
        <form @submit=${onSubmit.bind(null, ctx)} class="create-form">
          <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
          <input type="text" name="album" id="album-album" placeholder="Album" />
          <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
          <input type="text" name="release" id="album-release" placeholder="Release date" />
          <input type="text" name="label" id="album-label" placeholder="Label" />
          <input type="text" name="sales" id="album-sales" placeholder="Sales" />

          <button type="submit">post</button>
        </form>
      </div>
    </section>`



async function onSubmit(ctx, event) {

  event.preventDefault();
  const formData = new FormData(event.target);

  const data = {
    singer: formData.get('singer'),
    album: formData.get('album'),
    imageUrl: formData.get('imageUrl'),
    release: formData.get('release'),
    label: formData.get('label'),
    sales: formData.get('sales'),
  }

  await createAlbum(data);
  ctx.page.redirect('/catalog')

}