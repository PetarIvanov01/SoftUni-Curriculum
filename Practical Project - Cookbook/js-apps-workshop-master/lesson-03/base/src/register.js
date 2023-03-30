document.querySelector('form').addEventListener('submit', onRegister);

async function onRegister(e) {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (email == '' || password == '') {
            throw new Error('Set all fields');
        }
        if (password !== rePass) {
            throw new Error('Re-password is wrong')
        }

        const url = 'http://localhost:3030/users/register';
        let data = { email, password, rePass }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 200) {
            throw new Error('Faild request');
        }
        const responseData = await response.json();

        sessionStorage.setItem('accesToken', responseData.accessToken);

        window.location = 'http://127.0.0.1:5500/Practical%20Project%20-%20Cookbook/js-apps-workshop-master/lesson-03/base/index.html';
    }
    catch (error) {
        alert(error.message)
    }
}