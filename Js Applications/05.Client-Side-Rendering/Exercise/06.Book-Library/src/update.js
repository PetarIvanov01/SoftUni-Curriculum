import { html, updateBook } from "./util.js"

const updateTamplete = (book) => html`
<form id="edit-form" @submit=${onSubmit.bind(null, book)}>
        <input type="hidden" name="id" .value=${book._id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${book.author}>
        <input type="submit" value="Save">
    </form>
`

let context;

export function showUpdate(ctx) {
    context = ctx

    if (ctx.book == undefined) {
        return null
    }
    else{
        return updateTamplete(ctx.book)
    }

}

async function onSubmit(book,event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id')
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await updateBook(id, { title, author });
    event.target.reset();
    delete context.book;

    context.update();

}