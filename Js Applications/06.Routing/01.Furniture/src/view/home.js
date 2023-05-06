import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { getData } from "../data/data.js"

const homeTamplate = (promise) => html`
 <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
${until(promise, html`<h1>Loading...</h1>`)}
        </div>
    </div>
`

const elementTamplate = (data) => html`
 <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${data.img} />
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>${data.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${data._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`

async function loadElements() {

    const data = await getData();

    return data.map(elementTamplate);
}

export function showHome(ctx) {

    ctx.render(homeTamplate(loadElements()));

}

