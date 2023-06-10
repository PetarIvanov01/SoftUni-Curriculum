import { html} from '../util/lib.js'

export function catalogControler(ctx) {

    ctx.render(template());
}
const template = () => html`
<!--Dashboard-->
<section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            <div class="animals-board">
                <article class="service-img">
                    <img class="animal-image-cover" src="./images/cat2.jpg">
                </article>
                <h2 class="name">Athena</h2>
                <h3 class="breed">American Curl</h3>
                <div class="action">
                    <a class="btn" href="/details/1">Details</a>
                </div>
            </div>

            <!--If there is no pets in dashboard-->
            <div>
                <p class="no-pets">No pets in dashboard</p>
            </div>
        </div>
    </section>
`