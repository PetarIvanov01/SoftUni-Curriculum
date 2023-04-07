document.querySelector('form').addEventListener('submit', onLogin)

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
            sessionStorage.setItem('accesToken', user.accessToken);
            window.location = 'http://127.0.0.1:5500/Practical%20Project%20-%20Cookbook/js-apps-workshop-master/lesson-03/base/index.html';

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