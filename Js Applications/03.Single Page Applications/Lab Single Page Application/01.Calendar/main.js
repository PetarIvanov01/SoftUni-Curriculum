const sections = Array.from(document.querySelectorAll('section'));
const mainSection = sections[0];

hideAllElements()
function hideAllElements() {

    mainSection.style.display = 'block'
    for (let i = 1; i < sections.length; i++) {
        sections[i].style.display = 'none'
    }

}
mainSection.addEventListener('click', (event) => {

    hideAllElements()
    let target = event.target


    if (target.tagName == 'DIV') {

        let year = target.textContent;
        let currentSection = sections.filter(sec => sec.id == 'year-' + year)[0];
        currentSection.style.display = 'block';
        mainSection.style.display = 'none';

        const currentYear = currentSection.querySelector('.calendar');
        currentYear.addEventListener('click', displayMonth.bind(null, year, currentSection))
    }
})

function displayMonth(year, currentSection, event) {

    if (event.target.tagName == 'CAPTION') {
        hideAllElements()
    }
    else if (event.target.tagName == 'DIV') {

        let month = event.target.textContent;

        const monthsToDays = {
            'Jan': 1,
            'Feb': 2,
            'Mar': 3,
            'Apr': 4,
            'May': 5,
            'Jun': 6,
            'Jul': 7,
            'Aug': 8,
            'Sept': 9,
            'Oct': 10,
            'Nov': 11,
            'Dec': 12,
        };

        const currentMonth = monthsToDays[month];

        let daysPage = sections.filter(sec => sec.id == `month-${year}-${currentMonth}`)[0];
        daysPage.style.display = 'block';
        currentSection.style.display = 'none';

        daysPage.addEventListener('click', returnsToMonths.bind(null, currentSection))
    }
}

function returnsToMonths(currentSection, event) {
    
    if (event.target.tagName == 'CAPTION') {

        event.currentTarget.style.display = 'none';
        currentSection.style.display = 'block'

    }
}
