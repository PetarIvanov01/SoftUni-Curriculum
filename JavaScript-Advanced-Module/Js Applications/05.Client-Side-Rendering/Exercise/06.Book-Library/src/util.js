import { render, html } from "../node_modules/lit-html/lit-html.js"
import { until } from "../node_modules/lit-html/directives/until.js"

export {
    html,
    render,
    until,
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getById
}

let host = 'http://localhost:3030/jsonstore/collections/';

async function request(url, method = 'get', data) {

    const options = {
        method,
        headers:{}
    }
    
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options['body'] = JSON.stringify( data );
    }

    const res = await fetch(host + url, options);

    if (res.ok) {
        return await res.json()
    }

}

async function getBooks(url) {
    return request('books');

}
async function createBook(data) {
    return request('books', 'POST', data);

}
async function updateBook(id, data) {
    return request('books/' + id, 'PUT', data);

}
async function deleteBook(id) {
    return request('books/' + id, 'DELETE');

}
async function getById(id) {
    return request('books/' + id)
}