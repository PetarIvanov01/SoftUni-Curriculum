import * as api from "./api.js"
export * as api from "./api.js"

export const login = api.onLogin;
export const register = api.onRegister;
export const logout = api.onLogout;

const endPoints = {
    getAll: 'data/products?sortBy=_createdOn%20desc',
    create: 'data/products',
    getById: 'data/products/',
    editById: 'data/products/',
    deleteById: 'data/products/',
    bought: 'data/bought',
    total: (productId) =>
        `data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    own: (productId, userId) =>
        `data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export async function getProducts() {

    return await api.get(endPoints.getAll);
}

export async function createProduct(data) {

    return await api.post(endPoints.create, data);
}

export async function getProduct(id) {

    return await api.get(endPoints.getById + id);
}

export async function editProduct(id, data) {

    return await api.put(endPoints.editById + id, data);
}
export async function deleteProduct(id) {

    return await api.del(endPoints.deleteById + id);
}
export async function getCount(id) {

    return await api.get(endPoints.total(id));
}
export async function getOwnCount(productId, userId) {

    return await api.get(endPoints.own(productId, userId));
}
export async function boughtProduct(data) {

    return await api.post(endPoints.bought, data);
}
