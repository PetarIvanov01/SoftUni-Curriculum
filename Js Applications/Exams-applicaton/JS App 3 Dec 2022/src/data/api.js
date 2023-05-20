import { clearUserData, getUserData } from "../user/token.js";

let host = 'http://localhost:3030';

async function request(url, options) {


    try {
        const request = await fetch(host + url, options)

        if (request.ok == false) {
            if (request.status == 403) {
                clearUserData();
            }
            const err = await request.json();
            throw new Error(err.message);
        }

        if (request.status == 204) {
            return
        }
        else {
            return request.json();
        }

    } catch (error) {
        alert(error.message)
        throw error
    }

}
function createOptions(method = 'get', data) {

    const option = {
        method,
        headers: {}
    }
    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json'
        option.body = JSON.stringify(data);
    }
    const token = getUserData()

    if (token != null) {
        option.headers['X-Authorization'] = token.token;
    }

    return option
}

export async function get(url) {
    return await request(url, createOptions('get'));
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(url, createOptions('PUT', data));
}

export async function del(url) {
    return await request(url, createOptions('DELETE'));
}


