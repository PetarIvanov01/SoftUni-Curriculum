import { createBook, html } from "./util.js"


const createTemplate = () => html`
<form @submit=${onSubmit} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`

let context;

export function showCreate(ctx) {

    context = ctx
    if (ctx.book == undefined) {
        return createTemplate()
    }
    else {
        return null
    }

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await createBook({ title, author });
    event.target.reset();
    context.update();

}