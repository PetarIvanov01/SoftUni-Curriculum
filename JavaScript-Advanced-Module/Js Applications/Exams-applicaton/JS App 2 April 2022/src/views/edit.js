import { editPet, getDetails } from '../api/apiPets.js';
import { html, until } from '../util/lib.js'

let id;
let context;
export function editControler(ctx) {

    context = ctx;
    id = ctx.params.id;

    ctx.render(template(getItem()));

}
const template = (promise) => html`
<!--Edit Page-->
<section id="editPage">
    ${until(promise, html`<div>Loading...</div>`)}
</section>
`

const itemTemplate = (item) => html`
<form class="editForm" @submit=${onSubmit}>
        <img src="${item.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value="${item.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value="${item.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" .value="${item.age} years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" .value="${item.weight}kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value="${item.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
`

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const data = {
            name: formData.get('name'),
            breed: formData.get('breed'),
            age: formData.get('age'),
            weight: formData.get('weight'),
            image: formData.get('image'),
        }
        if (Object.values(data).some(el => el == '')) {
            throw new Error('All fields are required!')
        }
        await editPet(id, data);
        context.page.redirect('/details/' + id);

    } catch (error) {
        alert(error.message);
        throw error
    }
}

async function getItem() {
    const item = await getDetails(id);

    return itemTemplate(item);
}