import { updateNav } from "./data/util.js";

export function logout(nav) {

    sessionStorage.removeItem('user');
    alert('Logged Out!');
    const loginPage = nav['/login'];

    loginPage();
    updateNav();
    
}