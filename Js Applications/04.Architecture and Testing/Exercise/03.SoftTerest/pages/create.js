import { createIdea } from '../data/data.js'

const section = document.getElementById('createPage');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

let ctx = null

export function showCreate(context) {

    ctx = context
    context.showView(section)

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    await createIdea({ title, description, img });

    ctx.goto('/catalog');

}