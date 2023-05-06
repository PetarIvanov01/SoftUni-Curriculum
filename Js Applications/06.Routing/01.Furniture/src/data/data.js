import * as api from "./api.js"

export const login = api.onLogin;
export const register = api.onRegister;
export const logout = api.logout;

const paths = {
    all: 'data/catalog',
    byId: 'data/catalog/',
    myId: (id) => `data/catalog?where=_ownerId%3D%22${id}%22`
}

export async function getData() {

    return await api.get(paths.all)
}

export async function sendData(data) {

    return await api.post(paths.all, data)
}

export async function getDetails(id) {

    return await api.get(paths.byId + id);
}

export async function updateData(id, data) {

    return await api.put(paths.byId + id, data);
}

export async function deleteData(id) {

    return await api.del(paths.byId + id);
}

export async function myData(id) {

    return await api.get(paths.myId(id))
}

