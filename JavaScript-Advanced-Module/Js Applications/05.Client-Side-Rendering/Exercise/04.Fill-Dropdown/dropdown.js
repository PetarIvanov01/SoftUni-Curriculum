import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
const menu = document.querySelector('#menu');

getData()
const tamplete = (data) => html`<option .value=${data._id}>${data.text}</option>`;

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const text = event.target.querySelector('#itemText').value;
    event.target.reset();

    postData(text);

})
function update(data) {

    render(data.map(tamplete), menu)

}
async function getData() {

    const res = await fetch(url)
    const data = await res.json();

    update(Object.values(data));

}
async function postData(text) {

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })

    })
    if (res.ok) {
        getData();
    }
}