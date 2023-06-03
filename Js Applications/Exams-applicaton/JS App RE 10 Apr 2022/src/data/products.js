import * as api from "./api.js"
export * as api from "./api.js"

export const login = api.onLogin;
export const register = api.onRegister;
export const logout = api.onLogout;

const endpoints = {
    catalog: 'data/posts?sortBy=_createdOn%20desc',
    create: 'data/posts',
    donate: 'data/donations',
    details: (id) => `data/posts/${id}`,
    edit: (id) => `data/posts/${id}`,
    delete: (id) => `data/posts/${id}`,
    profile: (id) => `data/posts?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    own: (postId, userId) =>
        `data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    total: (postId) => `data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
};

export async function getCatalog() {

    return api.get(endpoints.catalog);
}

export async function createItem(data) {

    return api.post(endpoints.create, data);
}

export async function getItemById(id) {

    return api.get(endpoints.details(id));
}

export async function editById(id, data) {

    return api.put(endpoints.edit(id), data);
}

export async function deleteById(id) {

    return api.del(endpoints.delete(id));
}

export async function getProfile(id) {

    return api.get(endpoints.profile(id))
}

export async function sendDonate(postId) {

    return api.post(endpoints.donate, postId);
}

export async function getTotalDon(id) {

    return api.get(endpoints.total(id))
}

export async function getUserDonation(postId, userId) {
    return api.get(endpoints.own(postId, userId))
}