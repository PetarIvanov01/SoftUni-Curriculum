import { getDetails, updateDetails } from "../data/requests.js"
import { html } from "../data/util.js"

export async function editPage(ctx) {
    const id = ctx.params.id

    const item = await getDetails(id);

    ctx.render(editTamplate(ctx, id, item))

}

const editTamplate = (ctx, id, item) => html`
   <section id="create">
      <div class="form">
        <h2>Add Album</h2>
        <form @submit=${onSubmit.bind(null, ctx, id)} class="edit-form">
          <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value =${item.singer} />
          <input type="text" name="album" id="album-album" placeholder="Album" .value =${item.album} />
          <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value =${item.imageUrl} />
          <input type="text" name="release" id="album-release" placeholder="Release date" .value =${item.release} />
          <input type="text" name="label" id="album-label" placeholder="Label" .value =${item.label} />
          <input type="text" name="sales" id="album-sales" placeholder="Sales" .value =${item.sales} />

          <button type="submit">post</button>
        </form>
      </div>
</section>`

async function onSubmit(ctx, id, event) {

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

    await updateDetails(id, data);
    ctx.page.redirect('/catalog')

}