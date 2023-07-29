import * as api from "./apiRequests.js"

const endpoints = {
    catalog: "/data/facts?sortBy=_createdOn%20desc",
    create: "/data/facts",
    edit: (id) => `/data/facts/${id}`,
    search: (query) => `/data/facts?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `/data/facts/${id}`,
    delete: (id) => `/data/facts/${id}`,
    like: '/data/likes',
    totalLikes: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    userLikes: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export function getAll() {
    return api.get(endpoints.catalog);
}
export function createItem(data) {
    return api.post(endpoints.create, data);
}
export function deleteItem(id) {
    return api.del(endpoints.delete(id));
}
export function getById(id) {
    return api.get(endpoints.details(id));
}
export function editById(id, data) {
    return api.put(endpoints.edit(id), data);
}
//Bonus change
export async function isLike(data) {
    return await api.post(endpoints.like, data)
}
export async function getOwnLikes(factId, userId) {
    return await api.get(endpoints.userLikes(factId, userId))
}
export async function getAllLikes(id) {
    return await api.get(endpoints.totalLikes(id))
}