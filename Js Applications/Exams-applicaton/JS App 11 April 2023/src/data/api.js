import { clearUserData, getUserData, setUserData } from "./user.js";

let host = 'http://localhost:3030/';

async function request(url, option) {

    try {
        const response = await fetch(host + url, option);

        if (response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response
        }
        else {
            return await response.json()
        }

    }
    catch (error) {
        alert(error.message)
        throw error
    }
}

function createOptions(method = 'GET', data) {

    const option = {
        method,
        headers: {}
    }

    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data)
    }

    const userData = getUserData();
    if (userData != null) {
        option.headers['X-Authorization'] = userData.token;
    }

    return option;
}


export async function get(url) {

    return request(url, createOptions());
}

export async function post(url, data) {

    return request(url, createOptions('POST', data));
}

export async function put(url, data) {

    return request(url, createOptions('PUT', data));

}

export async function del(url) {

    return request(url, createOptions('DELETE'));
}

//User auth
export async function onLogin(email, password) {

    const result = await post('users/login', { email, password });

    const userData = {
        email: result.email,
        token: result.accessToken,
        id: result._id
    };
    setUserData(userData);

}
export async function onRegister(email, password) {

    const result = await post('users/register', { email, password });

    const userData = {
        email: result.email,
        token: result.accessToken,
        id: result._id
    };
    setUserData(userData);

}

export async function logout(ctx) {

    await get('users/logout');
    clearUserData();
    alert('You are logout');
    ctx.updateNav();
}