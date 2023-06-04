import { html, render } from "./node_modules/lit-html/lit-html.js";

const parent = document.getElementById('root');

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    let towns = document.getElementById('towns');
    
    update(towns.value.split(', '))
    event.target.reset()
    
})

function update(towns) {

    render(towns.map(templater), parent)

}
function templater(town) {
    return html`
    <ul>
        <li>${town}</li>
    </ul>
    `
}