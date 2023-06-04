import * as api from "./api.js"

const endPoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout'
}

export async function sendLogin(option) {

    const user = await api.post(endPoints.login, option)
    localStorage.setItem('user', JSON.stringify(user));

}
export async function sendRegister(option) {

    const user = await api.post(endPoints.register, option)
    localStorage.setItem('user', JSON.stringify(user));

}
export async function logout() {
    api.get(endPoints.logout);
    localStorage.removeItem('user');
}