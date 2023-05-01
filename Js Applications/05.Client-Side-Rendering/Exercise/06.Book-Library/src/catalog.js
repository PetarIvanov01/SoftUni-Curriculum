import { deleteBook, getBooks, html, until } from "./util.js"

const catalogTemplate = (bookPromise) => html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        ${until(bookPromise, html`<tr> <td colSpan="3">Loading&hellip;</td></tr>`)}
        </tbody>
    </table>
`

export function showCatalog(ctx) {

    return catalogTemplate(loadBooks(ctx));
}

const bookRow = (book, onEdit, onDelete) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button @click=${onDelete}>Delete</button>
    </td>
</tr>
`;

async function loadBooks(ctx) {
    const data = await getBooks();
    const books = Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }))

    return Object.values(books).map(book => bookRow(book, showEditor.bind(null, book, ctx), onDelete.bind(null, book, ctx)));
}

function showEditor(book, ctx) {
    ctx.book = book
    ctx.update()

}
async function onDelete(book, ctx) {

    await deleteBook(book._id)
    ctx.update();

}