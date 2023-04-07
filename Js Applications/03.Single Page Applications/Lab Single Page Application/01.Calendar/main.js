import { hideAllElements } from './router.js';
import { displayMonth } from './displayPages.js';
import { sections, mainSection } from './data.js';

hideAllElements();

mainSection.addEventListener('click', (event) => {

    hideAllElements();
    let target = event.target;

    if (target.tagName == 'DIV') {

        let year = target.textContent;
        let currentSection = sections.filter(sec => sec.id == 'year-' + year)[0];
        currentSection.style.display = 'block';
        mainSection.style.display = 'none';

        const currentYear = currentSection.querySelector('.calendar');

        currentYear.addEventListener('click', (e) => {

            displayMonth(e, currentSection, year);

        })
    }
});



