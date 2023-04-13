const regForm = document.querySelector('form');
regForm.addEventListener('submit', onRegister)

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(regForm);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required')
        }
        if (password !== rePass) {
            throw new Error('Password and rePass must be the same')
        }

        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json();
        const user = {
            'email': data.email,
            'id': data._id,
            'token': data.accessToken
        }
        
        sessionStorage.setItem('user', JSON.stringify(user))
        window.location = './index.html'

    }
    catch (err) {

        regForm.reset();
        alert(err.message);

    }

}