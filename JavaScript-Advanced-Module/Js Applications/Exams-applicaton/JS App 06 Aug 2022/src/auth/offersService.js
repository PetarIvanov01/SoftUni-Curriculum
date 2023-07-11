import * as api from "./api.js";

const endpoints = {

    catalog: "/data/offers?sortBy=_createdOn%20desc",
    create: "/data/offers",
    applications: "/data/applications",
    details: (id) => `/data/offers/${id}`,
    edit: (id) => `/data/offers/${id}`,
    delete: (id) => `/data/offers/${id}`,
    total: (offerId) =>
        `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    own: (offerId, userId) =>
        `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getOffers() {
    return await api.get(endpoints.catalog);
}

export async function createOffer(data) {
    return await api.post(endpoints.create, data);
}

export async function getById(id) {
    return await api.get(endpoints.details(id));
}

export async function editById(id, data) {
    return await api.get(endpoints.edit(id), data);
}

export async function deleteOffer(id) {
    return await api.delete(endpoints.delete(id));
}
