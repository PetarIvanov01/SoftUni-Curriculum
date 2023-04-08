export function authentication() {
    const token = sessionStorage.getItem('accesToken');

    fetch('http://localhost:3030/users/logout', {
        headers: {
            "X-Authorization": token
        }
    })
    sessionStorage.removeItem('accesToken');
}

export function checked() {

    const token = sessionStorage.getItem('accesToken');

    if (token != null) {
        document.getElementById('user').style.display = 'inline-block';
    }
    else {
        document.getElementById('guest').style.display = 'inline-block';
    }

}

export function logout() {

    authentication();

    window.location = 'http://127.0.0.1:5500/Practical%20Project%20-%20Cookbook/js-apps-workshop-master/lesson-04/base/index.html'
}