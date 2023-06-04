import * as api from "./api.js"
export * as api from "./api.js"

export const login = api.onLogin;
export const register = api.onRegister;
export const logout = api.onLogout;

const endpoints = {

    catalog: "data/shoes?sortBy=_createdOn%20desc",
    create: "data/shoes",
    edit: "data/shoes/",
    details: (id) => `data/shoes/${id}`,
    delete: (id) => `data/shoes/${id}`,
    search: (query) => `data/shoes?where=brand%20LIKE%20%22${query}%22`,

};

export async function getCatalog() {

    return api.get(endpoints.catalog);
}
export async function createShoe(data) {

    return api.post(endpoints.create, data);
}
export async function getDetails(id) {

    return api.get(endpoints.details(id));
}
export async function deleteShoe(id) {

    return api.del(endpoints.delete(id));
}
export async function searchShoes(querry) {

    return api.get(endpoints.search(querry));
}
export async function editShoe(id,data) {
    return api.put(endpoints.edit + id,data)
}