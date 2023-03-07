function validate() {
    // TODO
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confPass = document.getElementById('confirm-password');
    let company = document.getElementById('company');
    let companyInfo = document.getElementById('companyInfo');
    let companyNumber = document.getElementById('companyNumber');
    let buttonSubm = document.getElementById('submit');

    let validFlag = false;

    let valid = document.getElementById('valid');

    buttonSubm.addEventListener('click', submit)

    function submit(event) {
        event.preventDefault()

        let validators = {
            usernameVal,
            emailVal,
            passwordVal,
            companyVal,
        }


        usernameVal();
        emailVal();
        passwordVal();
        companyVal()

        if (validFlag) {
            valid.style.display = 'block';
        }
        else {
            valid.style.display = 'none';
        }
    }

    function usernameVal() {
        let reg = /^[A-z0-9]{3,20}$/m
        let value = username.value;
        if (!reg.test(value)) {
            username.style.borderColor = 'red';
            validFlag = false
        }
        else {
            username.style.border = '';
            validFlag = true
        }
    }

    function emailVal() {
        let reg = /[a-z]+@[a-z]+\.{1,}[a-z]+/m
        let value = email.value;
        if (!reg.test(value)) {
            email.style.borderColor = 'red';
            validFlag = false
        }
        else {
            email.style.border = '';
            validFlag = true
        }
    }

    function passwordVal() {
        let reg = /^[\w]{5,15}$/m

        let value = password.value;
        let confValue = confPass.value;

        if (!reg.test(value) || !reg.test(confValue) || value !== confValue) {

            password.style.borderColor = 'red';
            confPass.style.borderColor = 'red'
            validFlag = false
        }
        else {
            password.style.border = '';
            confPass.style.border = '';
            validFlag = true
        }
    }

    function companyVal() {
        let isChecked = company.checked;
        if (isChecked) {
            companyInfo.style.display = 'block';

        }

        else {
            companyInfo.style.display = 'none';

        }

        companyNumber.addEventListener('change', (event) => {
            let number = Number(event.target.value);
            if (number > 1000 && number < 9999) {
                companyNumber.style.border = ''
                validFlag = true
            }
            else {
                companyNumber.style.borderColor = 'red';
                validFlag = false
            }
        })
    }



}
