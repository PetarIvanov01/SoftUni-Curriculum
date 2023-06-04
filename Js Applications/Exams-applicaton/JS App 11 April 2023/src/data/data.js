import * as api from "./api.js"

export const login = api.onLogin;
export const register = api.onRegister;
export const logout = api.logout;

const paths = {
    get: 'data/events?sortBy=_createdOn%20desc',
    post: 'data/events',
    byId: 'data/events/',
    getCount: (eventId) => `data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    going: 'data/going',
    getCountUser: (eventId, userId) => `data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getData() {

    return await api.get(paths.get)
}

export async function sendData(data) {

    return await api.post(paths.post, data)
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

export async function getCount(id) {

    return await api.get(paths.getCount(id))
}
export async function goingTo(eventId) {

    return await api.post(paths.going, eventId)
}
export async function getCountForUser(eventId, userId) {

    return await api.get(paths.getCountUser(eventId, userId))
}

