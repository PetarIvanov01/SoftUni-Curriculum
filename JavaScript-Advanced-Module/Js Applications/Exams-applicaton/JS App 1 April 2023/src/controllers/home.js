import { html } from '../util.js'

export function homeControler(ctx) {

    ctx.render(template());
}
const template = () => html`
<!--Welcome Page-->
<section id="home">
        <h1>Learn more about your favorite fruits</h1>
        <img src="/images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png" alt="home" />

    </section>
`