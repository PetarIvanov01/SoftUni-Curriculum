const allView = document.querySelectorAll('.view-section')

// showView('#home-page')

function hideAllView() {
    allView.forEach(v => v.style.display = 'none')

}

export function showView(section) {
    hideAllView()
    section.style.display = 'block';
}


