import { contacts } from "./contacts.js"
import { render } from "./node_modules/lit-html/lit-html.js"
import { template } from "./template.js"


const div = document.getElementById('contacts');

update();
function update() {

    render(contacts.map(template), div)

}

div.addEventListener('click', onClick)

function onClick(event) {
    if (event.target.tagName == 'BUTTON') {

        const parrent = event.target.parentElement;
        const toggleElement = parrent.querySelector('.details');

        if (toggleElement.style.display == 'none') {
            toggleElement.style.display = 'block';
        }
        else {
            toggleElement.style.display = 'none';
        }
    }
}

