import * as api from "./apiRequest.js"
export * as api from "./apiRequest.js"

const endpoints = {

    catalog: "data/offers?sortBy=_createdOn%20desc",
    create: "data/offers",
    edit: "data/offers/",
    details: (id) => `data/offers/${id}`,
    delete: (id) => `data/offers/${id}`,
    applications: "data/applications",
    total: (offerId) =>
        `data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    own: (offerId, userId) =>
        `data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,

};

export async function getCatalog() {

    return api.get(endpoints.catalog);
}

export async function createOffer(data) {

    return api.post(endpoints.create, data);
}

export async function getDetails(id) {

    return api.get(endpoints.details(id));
}

export async function deleteOffer(id) {

    return api.del(endpoints.delete(id));
}

export async function editOffer(id, data) {

    return api.put(endpoints.edit + id, data);
}

export async function sendOffer(data) {

    return api.post(endpoints.applications, data);
}

export async function totalCountApplyes(id) {

    return api.get(endpoints.total(id));
}

export async function isApply(offerId, userId) {

    return api.get(endpoints.own(offerId, userId));
}