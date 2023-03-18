function validate() {

    let company = document.getElementById('company');
    let buttonSubm = document.getElementById('submit');

    company.addEventListener('change', (e) => {
        let companyInfo = document.getElementById('companyInfo');
        let isChecked = company.checked;
        if (isChecked) {
            companyInfo.style.display = 'block';
        }
        else {
            companyInfo.style.display = 'none';
        }
    })

    buttonSubm.addEventListener('click', (event) => {
        event.preventDefault()

        let validOut = [];
        let userName = document.querySelector("#username");
        let email = document.querySelector("#email");
        let passWord = document.querySelector("#password");
        let confirmPass = document.querySelector("#confirm-password");
        let checkBox = document.querySelector("#company");
        let userTest = /^[A-Za-z0-9]{3,20}$/;
        let emailTest = /^[^@.]+@[^@]*\.[^@]*$/;
        let passTest = /^[\w]{5,15}$/;

        if (!userTest.test(userName.value)) {
            userName.style.borderColor = "red";
            validOut.push(false);
        } else {
            userName.style.borderColor = "";
            validOut.push(true);
        }

        if (!emailTest.test(email.value)) {
            email.style.borderColor = "red";
            validOut.push(false);
        } else {
            email.style.borderColor = "";
            validOut.push(true);
        }

        if (
            passWord.value === confirmPass.value &&
            passTest.test(confirmPass.value) &&
            passTest.exec(passWord.value)
        ) {
            confirmPass.style.borderColor = "";
            passWord.style.borderColor = "";
            validOut.push(true);
        } else {
            confirmPass.style.borderColor = "red";
            passWord.style.borderColor = "red";
            validOut.push(false);
        }

        if (checkBox.checked) {
            let company = document.querySelector("#companyNumber");
            if (company.value < 1000 || company.value > 9999) {
                company.style.borderColor = "red";
                validOut.push(false);
            } else {
                company.style.borderColor = "";
                validOut.push(true);
            }
        }

        let valid = document.getElementById('valid');
        if (!validOut.includes(false)) {
            valid.style.display = 'block';
        }
        else {
            valid.style.display = 'none';
        }
    })
}
