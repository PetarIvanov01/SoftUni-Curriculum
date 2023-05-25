import { html } from "../data/util.js";

export function catalogPage(ctx) {

    ctx.render(catalogTamplate())

}

const catalogTamplate = () => html`
 <section id="dashboard">
      <h2>Collectibles</h2>
      <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        <li class="card">
          <img src="/images/travis.jpg" alt="travis" />
          <p>
            <strong>Brand: </strong><span class="brand">Air Jordan</span>
          </p>
          <p>
            <strong>Model: </strong><span class="model">1 Retro High TRAVIS SCOTT</span>
          </p>
          <p><strong>Value:</strong><span class="value">2000</span>$</p>
          <a class="details-btn" href="/details/1">Details</a>
        </li>
      </ul>

      <!-- Display an h2 if there are no posts -->
      <h2>There are no items added yet.</h2>
    </section>
      `