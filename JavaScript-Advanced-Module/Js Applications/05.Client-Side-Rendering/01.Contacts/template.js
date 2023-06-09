import { html } from "./node_modules/lit-html/lit-html.js"

export function template(contact) {

    return html`
    <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button class="detailsBtn">Details</button>
            <div class="details" id=${contact.id} style="display: none;">
                <p>Phone number: ${contact.phoneNumber}</p>
                <p>Email: ${contact.email}</p>
            </div>
        </div>
    </div>`
}


