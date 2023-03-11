
let result = document.getElementById('result')

function deleteByEmail() {

    let input = document.getElementsByName('email')[0]
    let email = input.value;

    let emailsArr = document.querySelectorAll('tbody tr td');

    for (let i = 1; i < emailsArr.length; i += 2) {

        let currentEmail = emailsArr[i].textContent;


        if (currentEmail === email) {

            emailsArr[i].parentElement.remove();

            result.textContent = 'Deleted.'

        }
        else {
            result.textContent = 'Not found.'
        }
    }
    input.value = ''
}