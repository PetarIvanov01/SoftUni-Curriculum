const loginSection = document.querySelector('.login');
const form = document.querySelector('#login-form');

form.addEventListener('submit', onLogin)

export function renderLogin() {

    loginSection.style.display = 'block';

}

async function onLogin(e) {
    e.preventDefault();

    try {
        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if (email == '') {
            throw new Error('Set email field');
        }
        if (password == '') {
            throw new Error('Set password field');
        }

        const response = await fetch('http://localhost:3030/users/login', {

            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })

        });
        if (response.status == 200) {

            const user = await response.json();
            sessionStorage.setItem('user', JSON.stringify(user));
            alert('You are logged!')
        }
        else {
            const error = await response.json();
            throw new Error(error.message);
        }

    }
    catch (error) {
        alert(error.message)
    }
}