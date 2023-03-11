function focused() {

    let elements = document.getElementsByTagName('input');

    for (const el of elements) {

        el.addEventListener('blur', blur);
        el.addEventListener('focus', focus);

        function focus(event) {
            el.parentElement.className = 'focused'
        }
        function blur(event) {
            el.parentElement.classList.remove('focused')
        }
    }
    
}