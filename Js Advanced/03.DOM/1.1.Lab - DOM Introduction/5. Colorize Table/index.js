function coloring() {

    // debugger
    let data = document.getElementsByTagName('table')[0];
    let elements = data.querySelectorAll('tr', 'td');
    let index = 1
    
    for (const el of elements) {
        
        if (index % 2 == 0) {
            el.style.backgroundColor = 'teal'
        }
        index++
    }
}