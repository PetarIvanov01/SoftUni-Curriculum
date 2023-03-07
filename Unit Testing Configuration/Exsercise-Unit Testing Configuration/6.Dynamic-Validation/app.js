function validate() {
    let emailField = document.getElementById('email');
    let reg = /[a-z]+@[a-z]+\.[a-z]+/gm;

    emailField.addEventListener('change', () => {

        if (!reg.test(emailField.textContent)) {
            emailField.style === 'none';
        }
        emailField.style === 'error';

    })
}