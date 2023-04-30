import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats as catData } from './catSeeder.js'

const section = document.getElementById('allCats');

catData.forEach(c => c.info = false)

const createCat = (cat) => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${toogleFunc.bind(null,cat)}>${cat.info ? 'Hide' : 'Show'} status code</button>
               ${cat.info ? html`<div class="status" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>`: null}
            </div>
        </li>`;


function update() {

    render(html`<ul> ${catData.map(createCat)} </ul>`, section)

}
update()

function toogleFunc(cat) {

    cat.info = !cat.info
    update()

}

