const loginForm = document.querySelector('form');
document.getElementById("user").style.display = "none";
loginForm.addEventListener('submit', onLoign)

async function onLoign(event) {
    event.preventDefault();

    const formData = new FormData(loginForm);

    const email = formData.get('email');
    const password = formData.get('password');

    try {

        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email, password })

        });
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message)
        }

        const data = await res.json();

        const userData = {
          email: data.email,
          id: data._id,
          token: data.accessToken,
        };
        
        sessionStorage.setItem('user', JSON.stringify(userData))
        window.location = './index.html'

    }
    catch (err) {
        loginForm.reset();
        alert(err.message);

    }

}