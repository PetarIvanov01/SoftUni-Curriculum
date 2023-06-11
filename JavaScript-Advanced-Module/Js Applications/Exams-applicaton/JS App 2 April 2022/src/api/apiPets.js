import { del, get, post, put } from "./apiRequests.js";

const endpoints = {

    catalog: 'data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: 'data/pets',
    donation: 'data/donation',
    details: (id) => `data/pets/${id}`,
    edit: (id) => `data/pets/${id}`,
    delete: (id) => `data/pets/${id}`,
    total: (petId) => `data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    own: (petId, userId) =>
        `data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

//CRUD
export async function getCatalog() {
    return await get(endpoints.catalog);
}
export async function createPet(data) {
    return await post(endpoints.create, data);
}
export async function editPet(id, data) {
    return await put(endpoints.edit(id), data)
}
export async function getDetails(id) {
    return await get(endpoints.details(id))
}
export async function deleteItem(id) {
    return await del(endpoints.delete(id))
}
//Donation logic requests
export async function sendDonations(data) {
    return await post(endpoints.donation, data);
}
export async function getOwnDonations(petId, userId) {
    return await get(endpoints.own(petId, userId))
}
export async function getByIdDonations(id) {
    return await get(endpoints.total(id))
}