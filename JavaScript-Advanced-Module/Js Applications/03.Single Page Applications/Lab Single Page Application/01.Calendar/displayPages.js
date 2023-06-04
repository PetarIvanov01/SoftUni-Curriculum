import { hideAllElements } from "./router.js";
import { returnsToMonths } from "./router.js";
import { sections,monthsToDays } from "./data.js";

export function displayMonth(event, currentSection, year) {

    if (event.target.tagName == 'CAPTION') {
        hideAllElements()
    }

    else if (event.target.tagName == 'DIV') {

        let month = event.target.textContent;

        const currentMonth = monthsToDays[month];

        let daysPage = sections.filter(sec => sec.id == `month-${year}-${currentMonth}`)[0];
        daysPage.style.display = 'block';
        currentSection.style.display = 'none';

        daysPage.addEventListener('click', (e) => {

            returnsToMonths(e, currentSection)

        })
    }
}