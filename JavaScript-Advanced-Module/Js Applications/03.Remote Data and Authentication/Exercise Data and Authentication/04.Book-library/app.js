let url = 'http://localhost:3030/jsonstore/collections/books';
let form = document.querySelector('form');
let formText = document.querySelector('form h3');

document.getElementById('loadBooks').addEventListener('click', getAllBooks);
form.addEventListener('submit', createBook);

async function getAllBooks(event) {

    formText.textContent = 'FORM';
    let response = await fetch(url);
    let data = await response.json();
    let tbody = document.querySelector('tbody')

    tbody.innerHTML = ''

    for (const [key, { author, title }] of Object.entries(data)) {

        let tr = document.createElement('tr');
        tbody.appendChild(tr);

        let tdTitle = createEl('td', title, tr);
        let tdAuthor = createEl('td', author, tr);
        let td = document.createElement('td');
        tr.appendChild(td);

        let buttonEdit = createEl('button', 'Edit', td);
        let buttonDelete = createEl('button', 'Delete', td);

        buttonDelete.addEventListener('click', deleted.bind(null, key, tr))
        buttonEdit.addEventListener('click', edit.bind(null, key))

    };

}

async function edit(bookId, event) {

    formText.textContent = 'Edit FORM';
    document.querySelector('form button').textContent = 'Save';

    const bookTitle = event.target.parentNode.parentNode.querySelector('td:nth-child(1)').textContent;
    const bookAuthor = event.target.parentNode.parentNode.querySelector('td:nth-child(2)').textContent;

    form.querySelector('input[name="title"]').value = bookTitle;
    form.querySelector('input[name="author"]').value = bookAuthor;

    form.removeEventListener('submit', createBook);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedBook = {
            title: form.querySelector('input[name="title"]').value,
            author: form.querySelector('input[name="author"]').value
        };

        await fetch(url + '/' + bookId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        // Clear the form after submitting
        form.reset();

        // Reload the books
        await getAllBooks();
    });
}

function deleted(id, tr, e) {

    fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'Delete',
    })
    tr.remove();

}

async function createBook(event) {

    event.preventDefault();

    let form = document.querySelector('form');
    let formData = new FormData(form);

    let data = {
        'title': formData.get('title'),
        'author': formData.get('author'),
    };
    await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    document.querySelectorAll('[type=text]').forEach(e => e.value = "");

}

function createEl(type, content, parrent) {

    let el = document.createElement(type);
    el.textContent = content;

    parrent.appendChild(el);
    return el
}