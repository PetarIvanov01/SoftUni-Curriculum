import { clearUserData, getUserData } from "./user.js";

let host = 'http://localhost:3030';

async function request(url,option) {

    try {
        const request = await fetch(host + url, option);
        if (!request.ok) {
            if (request.status == 403) {
                clearUserData();
            }
            const err = await request.json();
            throw new Error(err);
        }

        if (request.status == 204) {
            return
        }
        else {
            return request.json();
        }

    }
    catch (error) {

        throw error;
    }

}

function createOptions(method, data) {

    try {
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

    } catch (error) {
        throw error
    }

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

