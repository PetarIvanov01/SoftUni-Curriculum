import { mainSection, sections } from "./data.js";

export function hideAllElements() {

    mainSection.style.display = 'block'
    for (let i = 1; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }

}

export function returnsToMonths(event, currentSection) {

    if (event.target.tagName == 'CAPTION') {

        event.currentTarget.style.display = 'none';
        currentSection.style.display = 'block';

    }
}