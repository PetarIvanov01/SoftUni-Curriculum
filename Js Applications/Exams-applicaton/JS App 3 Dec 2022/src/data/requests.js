import { del, get, post, put } from "./api.js";

const endpoints = {
    catalog: '/data/albums?sortBy=_createdOn%20desc',
    create: '/data/albums',
    update: '/data/albums/',
    likes: '/data/likes',
    details: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    total: (albumId) =>
        `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    own: (albumId, userId) =>
        `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getCatalog() {
    return await get(endpoints.catalog);
}
export async function createAlbum(data) {
    return await post(endpoints.create, data);
}
export async function getLikes() {
    return await get(endpoints.likes);
}
export async function getDetails(id) {
    return await get(endpoints.details(id))
}
export async function updateDetails(id, data) {
    return await put(endpoints.update + id, data)
}
export async function deleteItem(id) {
    return await del(endpoints.delete(id))
}
export async function getOwnLikes(albumId, userId) {
    return await get(endpoints.own(albumId, userId))
}
export async function getAllLikes(id) {
    return await get(endpoints.total(id))
}
export async function isLike(data) {
    return await post(endpoints.likes, data)
}