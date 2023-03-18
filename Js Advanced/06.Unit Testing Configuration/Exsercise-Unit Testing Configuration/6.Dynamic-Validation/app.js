function validate() {

    let emailField = document.getElementById('email');
    let reg = /[a-z]+@[a-z]+\.[a-z]+/m;

    emailField.addEventListener('change', (event) => {

        if (!reg.test(event.target.value)) {
            emailField.classList.add('error')
        }
        else {
            emailField.classList.remove('error')
        }

    })
}