import { post, get } from "../api/apiRequests.js";
import { clearUserData, setUserData } from "../../src/api/user.js";


const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
};

export async function login(email, password) {

    const user = await post(endpoints.login, { email, password });
    alert('You are logged in!');
    setDataToLocaleSt(user)
}

export async function register(email, password) {

    const user = await post(endpoints.register, { email, password });
    alert('You are registerd!');
    setDataToLocaleSt(user)
}
export async function logout(ctx) {

    await get(endpoints.logout);
    alert('Logged out!')
    clearUserData();

    ctx.updateNav();
    ctx.page.redirect('/')
}

function setDataToLocaleSt(user) {

    const userData = {
        email: user.email,
        password: user.password,
        token: user.accessToken,
        id: user._id
    }
    setUserData(userData);

}