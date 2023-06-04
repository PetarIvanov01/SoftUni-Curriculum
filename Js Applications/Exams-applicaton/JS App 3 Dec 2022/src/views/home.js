import { html } from "../data/util.js"

export function homePage(ctx) {

    ctx.update();
    ctx.render(homeTamplate())

}
const homeTamplate = () => html`
<section id="home">
        <img src="/images/landing.png" alt="home" />

        <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
            here!</span></h2>
      </section>`