function validate() {
    let result = document.getElementById('email');
    let validEmail = new RegExp('[a-z]+@[a-z]+\.[a-z]+')
    result.addEventListener('change', changed)

    function changed(event) {

        let input = event.target.value;
        if (validEmail.test(input)) {
            event.target.classList.remove('error')
        }
        else {
            event.target.classList = 'error'
        }

    }
}