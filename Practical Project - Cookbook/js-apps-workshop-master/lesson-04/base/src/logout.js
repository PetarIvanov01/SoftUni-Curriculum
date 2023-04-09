export function logout() {
    const token = sessionStorage.getItem('accesToken');

    fetch('http://localhost:3030/users/logout', {
        headers: {
            "X-Authorization": token
        }
    })
    sessionStorage.removeItem('accesToken');
    alert('You logout!')
    window.location = 'http://127.0.0.1:5500/base/index.html?email=&password=';
}