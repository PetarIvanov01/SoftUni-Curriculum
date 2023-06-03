import { createItem } from '../data/products.js';
import { html } from '../util.js'

export function createPage(ctx) {

    ctx.render(createTamplate(onSubmit.bind(null, ctx)));

    async function onSubmit(ctx, event) {

        event.preventDefault();
        try {

            const formData = new FormData(event.target);;

            const data = Object.fromEntries(formData.entries());

            if (Object.values(data).some(v => v == '')) {
                throw new Error('All fields are required!');
            }
            const objForSend = {
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                address: data.address,
                phone: data.phone,
            }
            await createItem(objForSend);
            alert(`Item created successfully !`);

            ctx.updateNav();
            ctx.page.redirect('/')

        } catch (error) {
            alert(error.message);
            throw error
        }

    }
}

const createTamplate = (onSubmit) => html`

<section id="create-page" class="auth">
    <form id="create" @submit=${onSubmit} >
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
    </form>
</section>
`
