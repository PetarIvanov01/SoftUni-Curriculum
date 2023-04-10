import { router } from "./router.js";

export function logout() {
    const user = sessionStorage.getItem('user');
    const token = JSON.parse(user).accessToken;

    fetch('http://localhost:3030/users/logout', {
        headers: {
            "X-Authorization": token
        }
    })
    sessionStorage.removeItem('user');
    alert('You logout!')
    router('/');
}