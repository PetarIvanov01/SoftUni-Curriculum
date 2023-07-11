import { clearUserData, getUserData } from "./storage.js";

let host = 'http://localhost:3030';

async function request(url, options) {
    try {

        const response = await fetch(host + url, options);

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
            return response.json();
        }

    }
    catch (error) {
        throw error;
    }
}

function createOptions(method = 'GET', data) {
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

        if (user) {
            options.headers['X-Authorization'] = user.token;
        }

        return options;

    } catch (error) {
        throw error
    }
}

//All request functions 
export async function get(url) {

    return await request(url, createOptions('GET'));
}
export async function post(url, data) {

    return await request(url, createOptions('POST', data));
}
export async function put(url, data) {

    return await request(url, createOptions('PUT', data));
}
export async function del(url) {

    return await request(url, createOptions('DELETE'));
}