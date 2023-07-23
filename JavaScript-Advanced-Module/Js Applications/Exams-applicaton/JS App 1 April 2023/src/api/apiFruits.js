import * as api from "./apiRequests.js"

const endpoints = {

    catalog: "/data/fruits?sortBy=_createdOn%20desc",
    create: "/data/fruits",
    edit: (id) => `/data/fruits/${id}`,
    search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `/data/fruits/${id}`,
    delete: (id) => `/data/fruits/${id}`,
    search: (query) =>
        `/data/fruits?where=name%20LIKE%20%22${query}%22`,

};

export function getAll() {
    return api.get(endpoints.catalog);
}
export function createFruit(data) {
    return api.post(endpoints.create, data);
}
export function deleteFruit(id) {
    return api.del(endpoints.delete(id));
}
export function getById(id) {
    return api.get(endpoints.details(id));
}
export function editById(id, data) {
    return api.put(endpoints.edit(id), data);
}
export function searchedItems(query) {
    return api.get(endpoints.search(query));
}