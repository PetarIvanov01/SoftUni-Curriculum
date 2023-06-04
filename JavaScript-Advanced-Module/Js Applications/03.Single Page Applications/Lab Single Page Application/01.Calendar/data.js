const sections = Array.from(document.querySelectorAll('section'));
const mainSection = sections[0];
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

export {
    sections,
    mainSection,
    monthsToDays
} 