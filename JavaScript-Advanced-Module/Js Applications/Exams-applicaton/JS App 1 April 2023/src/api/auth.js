import { post, get } from "./apiRequests.js";
import { clearUserData, setUserData } from "./user.js";


const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
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
export async function logout() {

    await get(endpoints.logout);
    clearUserData();
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