import { getUserData, clearUserData, setUserData } from "./user.js";

let host = 'http://localhost:3030/';

async function request(url, option) {

    try {
        const response = await fetch(host + url, option);

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json()
            throw new Error(error.message);
        }
        if (response.status == 204) {
            return response;
        }
        else {
            return response.json();
        }

    }
    catch (error) {
        alert(error.message)
        throw error
    }
}

function createOptions(method = 'GET', data) {

    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();
    if (user != null) {
        options.headers['X-Authorization'] = user.token;
    }

    return options;
}

export async function get(url) {

    return await request(url, createOptions());
}
export async function post(url, data) {

    return await request(url, createOptions('POST',data));
}
export async function put(url,data) {

    return await request(url, createOptions('PUT',data));
}
export async function del(url) {

    return await request(url, createOptions('DELETE'));
}

//Login,register,logout func;

const endPoints = {
    login: 'users/login',
    register: 'users/register',
    logout: 'users/logout'
}

export async function onLogin(email, password) {

    const user = await post(endPoints.login, { email, password });
    setDataToLocaleSt(user);

}

export async function onRegister(email, password) {

    const user = await post(endPoints.register, { email, password });
    setDataToLocaleSt(user);

}

export function onLogout() {

    get(endPoints.logout);
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
